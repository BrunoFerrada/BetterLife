from django.db import models
from users.models import User

class formulas():
    idformula = models.AutoField(primary_key=True)
    iduser = models.ForeignKey(User, on_delete=models.CASCADE)
    formulaname = models.CharField("Nombre de la formula", max_length=50)
    variables =  models.JSONField("Variables", null=True, blank=True)
    resultado = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True) 