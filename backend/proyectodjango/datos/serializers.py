from rest_framework import serializers
from .models import Alumnos, Pasantias, Becas, Eventos, Recursos

class AlumnosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alumnos
        fields = '__all__'

class PasantiasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pasantias
        fields = '__all__'

class BecasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Becas
        fields = '__all__'

class EventosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Eventos
        fields = '__all__'

class RecursosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recursos
        fields = '__all__'