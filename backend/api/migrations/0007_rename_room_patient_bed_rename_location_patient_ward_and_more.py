# Generated by Django 5.0.3 on 2024-06-28 13:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_patient_disease_patient_room'),
    ]

    operations = [
        migrations.RenameField(
            model_name='patient',
            old_name='room',
            new_name='bed',
        ),
        migrations.RenameField(
            model_name='patient',
            old_name='location',
            new_name='ward',
        ),
        migrations.RemoveField(
            model_name='patient',
            name='disease',
        ),
    ]
