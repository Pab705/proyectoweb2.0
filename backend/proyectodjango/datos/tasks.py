#from celery import shared_task
from scripts.google_drive_manager import main as download_google_drive_files
import json
from .models import Alumnos,Pasantias,Becas,Eventos,Recursos
from django.conf import settings
import os

#@shared_task
def download_files_task():
    download_google_drive_files()

    # Después de almacenar en la base de datos
    data_to_save = {
        "alumnos": list(Alumnos.objects.values()),
        "pasantias": list(Pasantias.objects.values()),
        "becas": list(Becas.objects.values()),
        "eventos": list(Eventos.objects.values()),
        "recursos": list(Recursos.objects.values()),
    }

    # Obtén la ruta completa para el directorio static
    static_path = os.path.join(settings.BASE_DIR, 'datos', 'static')

    # Crea el archivo JSON en el directorio static
    json_path = os.path.join(static_path, 'datos.json')
    with open(json_path, 'w') as json_file:
        json.dump(data_to_save, json_file)