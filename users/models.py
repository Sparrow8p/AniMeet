from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    image = models.ImageField(upload_to='users_images', blank=True, null=True, verbose_name='Фото профиля')
    user_info = models.TextField(blank=True, null=True, verbose_name='О себе')
    phone = models.CharField(max_length=12, unique=True, blank=True, null=True, verbose_name='Номер телефона')
    city = models.CharField(max_length=30, blank=True, null=True, verbose_name='Город')
    status = models.BooleanField(default=False)

    class Meta:
        db_table = 'user'
        verbose_name = 'пользователя'
        verbose_name_plural = 'Пользователи'

    def __str__(self):
        return self.username