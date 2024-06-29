from django.contrib import admin
from api.models import User, Profile, Patient, PatientRecords,PatientDescription

class Useradmin(admin.ModelAdmin):
    list_display=['username','email','role']

class Profileadmin(admin.ModelAdmin):
    list_editable=['verified']
    list_display=['role','Name','specialty','verified']

class Patientadmin(admin.ModelAdmin):
    list_display=['patientName', 'patientId', 'doctorName','medConditions','ward','medication','pastMedHis','patientAge','patientHeight','patientSex','patientBloodGroup','bed']
    
class PatientRecordadmin(admin.ModelAdmin):
    list_display=['patientId','appointmentDate','appointmentTime', 'heartRate', 'diastolicBP', 'systolicBP', 'bodyTemp', 'spo2Value','respRate']


class PatientDescriptionadmin(admin.ModelAdmin):
    list_display=['patientId','description','treatment','diagnosis','symptoms']


    
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
admin.site.register(PatientDescription,PatientDescriptionadmin)

