from django.urls import path
from .views import AlumnosList, PasantiasList, BecasList, EventosList, RecursosList, AlumnosDetalle, PasantiasDetalle, BecasDetalle, EventosDetalle, RecursosDetalle, bienvenida, download_files_view, actualizar_datos

urlpatterns = [
    path('', bienvenida, name='bienvenida'),
    path('api/download-files/', download_files_view, name='download-files'),
    #path('api/actualizar-datos/', actualizar_datos, name='actualizar-datos'),
    path('api/alumnos/', AlumnosList.as_view(), name='alumnos-list'),
    path('api/alumnos/<int:pk>/', AlumnosDetalle.as_view(), name='alumnos-detalle'),
    path('api/pasantias/', PasantiasList.as_view(), name='pasantias-list'),
    path('api/pasantias/<int:pk>/', PasantiasDetalle.as_view(), name='pasantias-detalle'),
    path('api/becas/', BecasList.as_view(), name='becas-list'),
    path('api/becas/<int:pk>/', BecasDetalle.as_view(), name='becas-detalle'),
    path('api/eventos/', EventosList.as_view(), name='eventos-list'),
    path('api/eventos/<int:pk>/', EventosDetalle.as_view(), name='eventos-detalle'),
    path('api/recursos/', RecursosList.as_view(), name='recursos-list'),
    path('api/recursos/<int:pk>/', RecursosDetalle.as_view(), name='recursos-detalle'),
]