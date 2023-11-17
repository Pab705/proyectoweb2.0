from rest_framework import generics
from .models import Alumnos, Pasantias, Becas, Eventos, Recursos
from .serializers import AlumnosSerializer, PasantiasSerializer, BecasSerializer, EventosSerializer, RecursosSerializer
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from celery import Celery
from .tasks import download_files_task
from scripts.google_drive_manager import main as download_google_drive_files


def bienvenida(request):
    return HttpResponse("Sistema de Reportes para Programa de Doctorado de la Escuela de Ingeniería Informática de la PUCV")

def download_files_view(request):
    download_google_drive_files()
    return JsonResponse({'message': 'Archivos descargados exitosamente'})

def actualizar_datos(request):
    try:
        # Disparar la tarea Celery para descargar y actualizar los datos
        #result = download_files_task.delay()

        # Devolver el ID de la tarea si es útil para el frontend
        #return JsonResponse({"status": "success", "task_id": result.id})
    
        download_google_drive_files()  # Lógica para descargar los archivos
        return JsonResponse({'message': 'Datos actualizados exitosamente'})
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)})

"""
GET:
Las clases List responderán a solicitudes GET para listar todos los objetos.
Las clases Detalle responderán a solicitudes GET para obtener detalles de un objeto específico.

POST:
Las clases List responderán a solicitudes POST para crear nuevos objetos.

PUT y PATCH:
Las clases Detalle responderán a solicitudes PUT y PATCH para actualizar un objeto existente.

DELETE:
Las clases Detalle responderán a solicitudes DELETE para eliminar un objeto existente."""

class AlumnosList(generics.ListCreateAPIView):
    queryset = Alumnos.objects.all()
    serializer_class = AlumnosSerializer

class AlumnosDetalle(generics.RetrieveUpdateDestroyAPIView):
    queryset = Alumnos.objects.all()
    serializer_class = AlumnosSerializer

class PasantiasList(generics.ListCreateAPIView):
    queryset = Pasantias.objects.all()
    serializer_class = PasantiasSerializer

class PasantiasDetalle(generics.RetrieveUpdateDestroyAPIView):
    queryset = Pasantias.objects.all()
    serializer_class = PasantiasSerializer

class BecasList(generics.ListCreateAPIView):
    queryset = Becas.objects.all()
    serializer_class = BecasSerializer

class BecasDetalle(generics.RetrieveUpdateDestroyAPIView):
    queryset = Becas.objects.all()
    serializer_class = BecasSerializer

class EventosList(generics.ListCreateAPIView):
    queryset = Eventos.objects.all()
    serializer_class = EventosSerializer

class EventosDetalle(generics.RetrieveUpdateDestroyAPIView):
    queryset = Eventos.objects.all()
    serializer_class = EventosSerializer

class RecursosList(generics.ListCreateAPIView):
    queryset = Recursos.objects.all()
    serializer_class = RecursosSerializer

class RecursosDetalle(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recursos.objects.all()
    serializer_class = RecursosSerializer

# Crea una instancia de Celery para usarla en el código
celery_app = Celery('proyectodjango')
celery_app.config_from_object('django.conf:settings', namespace='CELERY')

# Agendar la tarea para que se ejecute cada día a las 2 AM (ajusta el cron según tus necesidades)
celery_app.conf.beat_schedule = {
    'download-files-every-day': {
        'task': 'datos.tasks.download_files_task',
        'schedule': 86400,  # Segundos en un día
    },
}

# Inicia el beat scheduler de Celery (asegúrate de ejecutar también 'celery -A proyectodjango beat' en otra terminal)
celery_app.conf.beat_schedule
celery_app.conf.timezone = 'UTC'

# Otra vista para ejecutar manualmente la tarea
def download_files_view(request):
    download_files_task.apply_async()
    return JsonResponse({'message': 'Descarga de archivos iniciada'})