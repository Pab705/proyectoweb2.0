from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

# Establecer la configuración de Django para que Celery pueda encontrar la aplicación
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'proyectodjango.settings')

# Crear una instancia de la aplicación Celery
app = Celery('proyectodjango')

# Cargar la configuración de Celery desde el archivo de configuración de Django
app.config_from_object('django.conf:settings', namespace='CELERY')

# Descubre y configura las tareas desde todas las aplicaciones de Django en el proyecto
app.autodiscover_tasks()
