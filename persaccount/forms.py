from django.forms import DateTimeInput, ModelForm, Select, TextInput, Textarea, FileInput, TimeInput
from persaccount.models import Meets

class CreateEvent(ModelForm):
    
    class Meta:
        model = Meets
        fields = [
            'name',
            'description',
            'image',
            'date',
            'start_time',
            'end_time',
            'address',
            'quantity',
            'chat_name',
            'chat_image',
            'category'
            ]
        
        widgets = {
            'name': TextInput(attrs={
                'placeholder': 'Например: Просмотр фильма "твоё имя"',
                'id': 'event-title',
            }),
            'description': Textarea(attrs={
                'id': 'event-description',
                'placeholder': 'Например: "Сначала идем в кинотеатр и смотрим "Твое имя", а после идем в ближайшую кафешку и в ламповой атмосфере обсуждаем фильм и просто общаемся))"',
            }),
            'image': FileInput(attrs={
                'class': 'upload-file',
                'accept': 'image/*',
                'id': 'event-image',
                'name': 'image',
                'style': 'display: none;',
            }),
            'date': DateTimeInput(attrs={
                'placeholder': 'ДД.ММ.ГГГГ',
                'id': 'event-date',
                'name': 'date',
            }),
            'start_time': TimeInput(attrs={
                'placeholder': 'ЧЧ:ММ',
                'id': 'event-start',
                'name': 'start_time',
            }),
            'end_time': TimeInput(attrs={
                'placeholder': 'ЧЧ:ММ (или оставить пустым)',
                'id': 'event-end',
                'name': 'end_time',
            }),
            'address': TextInput(attrs={
                'placeholder': 'Например: Москва, Новый Арбат, 21',
                'id': 'event-location',
                'name': 'address',
            }),
            'quantity': TextInput(attrs={
                'placeholder': 'Например:100 (или оставить пустым, если ограничений нет)',
                'id': 'event-participants',
                'name': 'quantity',
            }),
            'chat_name': TextInput(attrs={
                'placeholder': 'Например: просмотр фильма "Твоё имя"',
                'id': 'event-chat-name',
                'name': 'chat_name',
            }),
            'chat_image': FileInput(attrs={
                'class': 'upload-file',
                'accept': 'image/*',
                'id': 'event-chat-image',
                'name': 'chat_image',
            }),
            'category': Select(attrs={
            'class': 'category-select',
            'id': 'event-category',
            'name': 'category',
            }),
        }
