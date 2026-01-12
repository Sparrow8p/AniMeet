import os
import sys

os.environ['DJANGO_SECRET_KEY'] = 'ваш_секретный_ключ_50+_символов'
os.environ['DJANGO_SETTINGS_MODULE'] = 'app.settings'

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()


# 1. Путь к проекту
path = '/home/Sparrow8p/AniMeet'
if path not in sys.path:
    sys.path.append(path)

# 2. Файл настроек
os.environ['DJANGO_SETTINGS_MODULE'] = 'app.settings'

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()