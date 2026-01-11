from django.db import models
from django.urls import reverse
from django.utils.text import slugify
from transliterate import translit

from users.models import User


class Categories(models.Model):
    name = models.CharField(max_length=150, unique=True, verbose_name='Название')
    slug = models.SlugField(max_length=200, unique=True, blank=True, null=True, verbose_name='URL')

    class Meta:
        db_table = 'category'
        verbose_name = 'категорию'
        verbose_name_plural = 'Категории'

    def __str__(self):
        return self.name
    

class Meets(models.Model):
    name = models.CharField(max_length=100, unique=True, verbose_name='Название')
    slug = models.SlugField(max_length=200, unique=True, blank=True, null=True, verbose_name='URL')
    description = models.TextField(blank=True, null=True, verbose_name='Описание')
    image = models.ImageField(upload_to='meets_images', blank=True, null=True, verbose_name='Изображение')
    date = models.DateField(verbose_name="Дата")
    start_time = models.TimeField(verbose_name="Время начала")
    end_time = models.TimeField(verbose_name="Время конца")
    address = models.CharField(max_length=150, verbose_name='Адрес')
    quantity = models.PositiveIntegerField(verbose_name='Макс. количество участников')
    chat_name = models.CharField(max_length=50, verbose_name='Название чата')
    chat_image = models.ImageField(upload_to='meets_chat_images', blank=True, null=True, verbose_name='Изображение чата')
    category = models.ForeignKey(to=Categories, on_delete=models.CASCADE, verbose_name='Категория')


    class Meta:
        db_table = 'meet'
        verbose_name = 'мероприятие'
        verbose_name_plural = 'Мероприятия'
        ordering = ('id',)

    def __str__(self):
        return self.name
    
    def get_absolute_url(self):
        return reverse('article_detail', kwargs={'slug': self.slug})

    def save(self, *args, **kwargs):
        if not self.slug:
            # Преобразуем русский текст в английский
            transliterated = translit(self.name, 'ru', reversed=True)
            # Генерируем slug
            self.slug = slugify(transliterated)
            
            # Проверяем уникальность
            original_slug = self.slug
            num = 1
            while Meets.objects.filter(slug=self.slug).exclude(id=self.id).exists():
                self.slug = f"{original_slug}-{num}"
                num += 1
            
        return super().save(*args, **kwargs)
    

class MeetParticipant(models.Model):
    meet = models.ForeignKey(Meets, on_delete=models.CASCADE, related_name='participants')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    registration_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('meet', 'user')  # чтобы пользователь не мог записаться дважды
        verbose_name = 'Участник мероприятия'
        verbose_name_plural = 'Участники мероприятий'