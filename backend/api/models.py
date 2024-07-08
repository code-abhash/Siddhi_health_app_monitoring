#importing Abstract user to add extra fields
from django.contrib.auth.models import AbstractUser
from django.db import models

# Extending the AbstractUser to add additional fields.
class User(AbstractUser):
    username = models.CharField(max_length=150, unique=True)
    email=models.EmailField(unique=True)
    role=models.CharField(max_length=100)
    
    

    def __str__(self):
        return self.username
    

# Profile model to store additional user profile information.
class Profile(models.Model):
    username=models.CharField(max_length=100) 
    specialty = models.CharField(max_length=100)
    image = models.ImageField(upload_to='profile_images/', null=True, blank=True)
    name=models.CharField(max_length=100, null=True)

    def __str__(self):
        return self.username
    

# Patient model to store patient information.
class Patient(models.Model):
    patientName = models.CharField(max_length=100)
    patientId = models.CharField(max_length=100, unique=True, primary_key=True)
    doctorName = models.CharField(max_length=100)
    ward=models.CharField( max_length=500, null=True)
    pastMedHis=models.CharField(max_length=1000)
    patientAge=models.IntegerField()
    patientHeight=models.CharField(max_length=20)
    patientSex=models.CharField(max_length=20)
    patientBloodGroup=models.CharField(max_length=20)
    bed=models.CharField(max_length=20, null=True)

    def __str__(self):
        return self.patientId

# Model to store patient records, linked to the Patient model.
class PatientRecords(models.Model):
    patientId = models.ForeignKey(Patient,on_delete=models.CASCADE,related_name='records')
    appointmentDate = models.DateField()
    appointmentTime = models.TimeField()
    heartRate = models.CharField(max_length=20)
    diastolicBP = models.IntegerField()
    systolicBP = models.IntegerField()
    bodyTemp = models.CharField(max_length=20)
    spo2Value = models.CharField(max_length=25, null=True)
    respRate=models.CharField(max_length=20, null=True)
    medication=models.CharField(max_length=1000,null=True)

    def __str__(self):
        return f"{self.patientId.patientId} - {self.appointmentDate} {self.appointmentTime}"
    
# Model to store detailed patient description, linked to the Patient model.
class PatientDescription(models.Model):
    patientId = models.OneToOneField(Patient, on_delete=models.CASCADE, primary_key=True, related_name='description')
    description = models.TextField(default="No description available.")
    treatment = models.TextField(default="No treatment information available.")
    diagnosis = models.TextField(default="No diagnosis information available.")
    symptoms = models.TextField(default="No symptoms information available.")

    def __str__(self):
        return f"{self.patientId.patientId}"