from django.contrib import admin
from api.models import User, Profile, Patient, PatientRecords,PatientDescription

#list_display: It has field that will be diplayed in listview and database
#list_filter:  Adds filters to the right sidebar in the list view for easier navigation.

# Custom admin configuration for the User model
class Useradmin(admin.ModelAdmin):
    list_display=['username','email','role','password']
# Custom admin configuration for the Profile model
class Profileadmin(admin.ModelAdmin):
    
    list_display=['username','specialty','image','name']
# Custom admin configuration for the Patientadmin model
class Patientadmin(admin.ModelAdmin):
    list_display=['patientName', 'patientId', 'doctorName','ward','pastMedHis','patientAge','patientHeight','patientSex','patientBloodGroup','bed']
    list_filter=['patientId','doctorName']
 # Custom admin configuration for the PatientRecord model   
class PatientRecordadmin(admin.ModelAdmin):
    list_display=['patientId','appointmentDate','appointmentTime', 'heartRate', 'diastolicBP', 'systolicBP', 'bodyTemp', 'spo2Value','respRate','medication']
    list_filter=['patientId','appointmentDate']

# Custom admin configuration for the Patientdescriptions model
class PatientDescriptionadmin(admin.ModelAdmin):
    list_display=['patientId','description','treatment','diagnosis','symptoms']


admin.site.register(User, Useradmin)
admin.site.register(Profile, Profileadmin)
admin.site.register(Patient, Patientadmin)
admin.site.register(PatientRecords, PatientRecordadmin)
admin.site.register(PatientDescription,PatientDescriptionadmin)

