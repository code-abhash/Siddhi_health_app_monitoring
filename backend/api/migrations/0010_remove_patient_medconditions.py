# Generated by Django 5.0.3 on 2024-07-01 10:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_remove_patient_id_remove_patientdescription_id_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='patient',
            name='medConditions',
        ),
    ]