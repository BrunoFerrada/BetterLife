# Generated by Django 5.1.1 on 2024-10-17 23:19

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Diet',
            fields=[
                ('idDiet', models.AutoField(primary_key=True, serialize=False)),
                ('dietname', models.CharField(max_length=150)),
                ('calories', models.FloatField()),
                ('protein', models.FloatField()),
                ('carbohydrates', models.FloatField()),
                ('fats', models.FloatField()),
            ],
        ),
    ]
