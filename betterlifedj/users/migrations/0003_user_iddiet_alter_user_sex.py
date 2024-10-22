# Generated by Django 5.1.1 on 2024-10-17 23:19

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nutrition', '0001_initial'),
        ('users', '0002_alter_user_activity'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='idDiet',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='User', to='nutrition.diet'),
        ),
        migrations.AlterField(
            model_name='user',
            name='sex',
            field=models.CharField(blank=True, choices=[('M', 'Masculino'), ('F', 'Femenino')], max_length=1, null=True, verbose_name='Sexo'),
        ),
    ]
