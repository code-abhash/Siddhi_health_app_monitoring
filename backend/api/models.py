#importing Abstract user to add extra fields
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone


class User(AbstractUser):
    username = models.CharField(max_length=150, unique=True)
    email=models.EmailField(unique=True)
    role=models.CharField(max_length=100)
    
    

    def __str__(self):
        return self.role
    

class Profile(models.Model):
    # user=models.OneToOneField(User, on_delete=models.CASCADE) 
    role=models.CharField(max_length=100,default='doctor') 
    verified=models.BooleanField(default=False)
    Name=models.CharField( max_length=150)
    specialty = models.CharField(max_length=100)

    def __str__(self):
        return self.Name
    

    

class Patient(models.Model):
    patientName = models.CharField(max_length=100)
    patientId = models.CharField(max_length=100, unique=True)
    doctorName = models.CharField(max_length=100)
    medConditions=models.CharField(max_length=1000)
    location=models.CharField( max_length=500, null=True)
    medication=models.CharField(max_length=1000)
    pastMedHis=models.CharField(max_length=1000)
    patientAge=models.IntegerField()
    patientHeight=models.CharField(max_length=20)
    patientSex=models.CharField(max_length=20)
    patientBloodGroup=models.CharField(max_length=20)

    def __str__(self):
        return self.patientId
    
class PatientRecords(models.Model):
    patientId = models.CharField(max_length=100)
    appointmentDate = models.DateField()
    appointmentTime = models.TimeField()
    heartRate = models.CharField(max_length=20)
    diastolicBP = models.IntegerField()
    systolicBP = models.IntegerField()
    bodyTemp = models.CharField(max_length=20)
    spo2Value = models.CharField(max_length=25, null=True)

    def __str__(self):
        return f"{self.patientId} - {self.appointmentDate} {self.appointmentTime}"

