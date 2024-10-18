from django.db import models
from django.contrib.auth.models import AbstractUser

SEX_CHOICES = [
    ('Masculino', 'Masculino'),
    ('Femenino', 'Femenino'),
]

ACTIVITY_CHOICES = [
    ('sedentario', 'Sedentario'),
    ('ligera', 'Ligero'),
    ('moderada', 'Moderado'),
    ('activo', 'Activo'),
    ('muy_activo', 'Muy activo'),
]

class User(AbstractUser):
    weight = models.FloatField("Peso", blank=True, null=True)
    height = models.FloatField("Altura", blank=True, null=True)
    sex = models.CharField("Sexo", max_length=10, choices=SEX_CHOICES, blank=True, null=True)
    age = models.PositiveIntegerField("Edad", blank=True, null=True)
    activity = models.CharField("Actividad Fisica", max_length=20, choices=ACTIVITY_CHOICES, blank=True, null=True)
    basalmetabolism = models.FloatField("Metabolismo basal", blank=True, null=True)
    bodymassindex = models.FloatField("Indice de masa corporal", blank=True, null=True)
    waterrequirement = models.FloatField("Requerimiento de agua", blank=True, null=True)