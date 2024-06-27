from django.contrib import admin
from api.models import User, Profile, Patient, PatientRecords

class Useradmin(admin.ModelAdmin):
    list_display=['username','email','role']

class Profileadmin(admin.ModelAdmin):
    list_editable=['verified']
    list_display=['role','Name','specialty','verified']

class Patientadmin(admin.ModelAdmin):
    list_display=['patientName', 'patientId', 'doctorName','medConditions','location','medication','pastMedHis','patientAge','patientHeight','patientSex','patientBloodGroup','disease','room']
    
class PatientRecordadmin(admin.ModelAdmin):
    list_display=['patientId','appointmentDate','appointmentTime', 'heartRate', 'diastolicBP', 'systolicBP', 'bodyTemp', 'spo2Value','respRate']
    
# class Doctoradmin(admin.ModelAdmin):
#     list_display=['role','Name','specialty']
#     list_editable=['Name','specialty']


# class Nurseadmin(admin.ModelAdmin):
#     list_display=['role','nurseName']
#     list_editable=['nurseName']

admin.site.register(User, Useradmin)
admin.site.register(Profile, Profileadmin)
admin.site.register(Patient, Patientadmin)
admin.site.register(PatientRecords, PatientRecordadmin)
#admin.site.register(Doctor, Doctoradmin)
# admin.site.register(Nurse, Nurseadmin)
