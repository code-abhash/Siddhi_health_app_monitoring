from django.contrib import admin
from api.models import User, Profile, Patient, PatientRecords,PatientDescription

class Useradmin(admin.ModelAdmin):
    list_display=['username','email','role','password']

class Profileadmin(admin.ModelAdmin):
    list_editable=['verified']
    list_display=['role','Name','specialty','verified']

class Patientadmin(admin.ModelAdmin):
    list_display=['patientName', 'patientId', 'doctorName','ward','pastMedHis','patientAge','patientHeight','patientSex','patientBloodGroup','bed']
    list_filter=['patientId','doctorName']
    
class PatientRecordadmin(admin.ModelAdmin):
    list_display=['patientId','appointmentDate','appointmentTime', 'heartRate', 'diastolicBP', 'systolicBP', 'bodyTemp', 'spo2Value','respRate','medication']
    list_filter=['patientId','appointmentDate']


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

