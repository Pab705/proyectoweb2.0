from django.db import models

class Alumnos(models.Model):
    IDalumno = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    rut = models.CharField(max_length=12)
    fechaIngreso = models.DateField()
    fechaEgreso = models.DateField(null=True, blank=True)
    estadoAvance = models.CharField(max_length=50)
    semestre = models.CharField(max_length=25)
    examenCand = models.BooleanField()
    examenGrado = models.BooleanField()
    institProcPreg = models.CharField(max_length=100)
    institProcPostg = models.CharField(max_length=100)
    tituloPregrado = models.CharField(max_length=100)
    tituloPostgrado = models.CharField(max_length=100)
    profGuia = models.CharField(max_length=100)
    cotutela = models.BooleanField()
    genero = models.CharField(max_length=50)
    nacionalidad = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre

class Pasantias(models.Model):
    profDestino = models.CharField(max_length=100)
    profOrigen = models.CharField(max_length=100)
    fechaInicio = models.DateField()
    fechaTermino = models.DateField()
    recursos = models.IntegerField()
    beneficios = models.CharField(max_length=200)
    institucionBeneficio = models.CharField(max_length=50)
    alumno = models.ForeignKey(Alumnos, on_delete=models.CASCADE)

    def __str__(self):
        return f"Pasantia de {self.alumno.nombre}"

class Becas(models.Model):
    nombreBenef = models.CharField(max_length=100)
    institucion = models.CharField(max_length=100)
    recursos = models.IntegerField()
    año = models.DateField()
    alumno = models.ForeignKey(Alumnos, on_delete=models.CASCADE)

    def __str__(self):
        return f"Beca {self.nombreBenef} para {self.alumno.nombre}"

class Eventos(models.Model):
    nombreEvento = models.CharField(max_length=250)
    año = models.DateField()
    recursos = models.IntegerField()
    institucion = models.CharField(max_length=100)
    numEstudiantes = models.IntegerField()
    alumno = models.ForeignKey(Alumnos, on_delete=models.CASCADE)

    def __str__(self):
        return f"Evento {self.nombreEvento} para {self.alumno.nombre}"

class Recursos(models.Model):
    recursosBecas = models.IntegerField()
    recursosPasantias = models.IntegerField()
    recursosEventos = models.IntegerField()
    recursosDisponibles = models.IntegerField()
    recursosUtilizados = models.IntegerField()
    recursosExternos = models.IntegerField()
    año = models.DateField()

    def __str__(self):
        return f"Recursos para el año {self.año}"