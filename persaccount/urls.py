"""
URL configuration for app project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path

from persaccount import views

app_name = "persaccount"

urlpatterns = [
    path('meets/', views.meets, name='meets'),
    path('meetinfo/<slug:meet_slug>/', views.meet_info, name='meet_info'),
    path('event_create/', views.event_create, name='event_create'),
    path('kalendar/', views.kalendar, name='kalendar'),
    path('members/<slug:meet_slug>/', views.members, name='members'),
]