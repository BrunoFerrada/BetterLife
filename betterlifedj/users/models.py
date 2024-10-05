from django.db import models
from django.contrib.auth.models import AbstractUser

SEX_CHOICES = [
    ('M', 'Masculino'),
    ('F', 'Femenino'),
    ('O', 'Otro'),
]

ACTIVITY_CHOICES = [
    ('sedentary', 'Sedentario'),
    ('light', 'Ligero'),
    ('moderate', 'Moderado'),
    ('active', 'Activo'),
    ('very_active', 'Muy activo'),
]

class User(AbstractUser):
    weight = models.FloatField("Peso", blank=True, null=True)
    height = models.FloatField("Altura", blank=True, null=True)
    sex = models.CharField("Sexo", max_length=1, choices=SEX_CHOICES, blank=True, null=True)
    age = models.PositiveIntegerField("Edad", blank=True, null=True)
    activity = models.CharField("Actividad Fisica", max_length=20, choices=ACTIVITY_CHOICES, blank=True, null=True)
    basalmetabolism = models.FloatField("Metabolismo basal", blank=True, null=True)
    bodymassindex = models.FloatField("Indice de masa corporal", blank=True, null=True)
    waterrequirement = models.FloatField("Requerimiento de agua", blank=True, null=True)