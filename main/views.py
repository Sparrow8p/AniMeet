from django.shortcuts import render

def index(request):

    context = {
        "title": "AniMeet - Главная"
    }

    return render(request, "main/index.html", context)
