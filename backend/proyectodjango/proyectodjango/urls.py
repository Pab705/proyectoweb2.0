"""
URL configuration for proyectodjango project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
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
from django.contrib import admin
from django.urls import path, include
from datos.views import bienvenida, download_files_view  # Importa la vista download_files_view desde datos.views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('datos/', include('datos.urls')),  # Incluye las URLs de la aplicación 'datos'
    path('api/download-files/', download_files_view, name='download-files'),  # Agrega la nueva ruta
    path('', bienvenida, name='bienvenida'),
]
