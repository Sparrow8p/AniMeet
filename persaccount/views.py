from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse
from persaccount.models import MeetParticipant, Meets
from persaccount.forms import CreateEvent

from django.contrib import messages
from django.db.models import Count

def meets(request):

    meets = Meets.objects.annotate(participants_count=Count('participants')).all()

    context = {
        "title": "AniMeet - Мероприятия",
        "meets": meets,
    }

    return render(request, "persaccount/meets.html", context)


def meet_info(request, meet_slug):
    meet = get_object_or_404(Meets, slug=meet_slug)
    
    if request.method == 'POST':
        if request.user.is_authenticated:
            already_registered = MeetParticipant.objects.filter(meet=meet, user=request.user).exists()
            
            if not already_registered:
                
                if meet.participants.count() < meet.quantity:
                    MeetParticipant.objects.create(meet=meet, user=request.user)
                    messages.success(request, 'Вы успешно записаны на мероприятие!')
                else:
                    messages.error(request, 'К сожалению, все места уже заняты.')
            else:
                messages.warning(request, 'Вы уже записаны на это мероприятие.')
        else:
            messages.error(request, 'Для записи на мероприятие необходимо авторизоваться.')
            return redirect('login')  
    
    participants_count = meet.participants.count()
    
    context = {
        "title": "AniMeet - Информация о мероприятии",
        "meet": meet,
        "participants_count": participants_count,
        "is_registered": request.user.is_authenticated and MeetParticipant.objects.filter(meet=meet, user=request.user).exists(),
    }

    return render(request, "persaccount/meetinfo.html", context)


def event_create(request):

    form = CreateEvent()
    error = ''

    if request.method == 'POST':
        form = CreateEvent(request.POST, request.FILES)
        if form.is_valid():
            form.save()

            return HttpResponseRedirect(reverse('persaccount:meets'))
        else:
            error = "Убедитесь в корректности вводимых данных"

    form = CreateEvent()

    context = {
        "title": "AniMeet - Создать мероприятие",
        "form": form,
        'error': error,
    }

    return render(request, "persaccount/event_create.html", context)


def kalendar(request):
    
    context = {
        "title": "AniMeet - Календарь",
    }

    return render(request, "persaccount/kalendar.html", context)


def members(request, meet_slug):
    
    meet = get_object_or_404(Meets, slug=meet_slug)
    participants = meet.participants.all() 
    
    context = {
        'meet': meet,
        'participants': participants,
    }

    return render(request, 'persaccount/members.html', context)