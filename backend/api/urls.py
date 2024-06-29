from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path
from api import views


urlpatterns = [
    
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('dashboard/', views.dashboard),
    path('patientslist/', views.patientslist, name='patient_list'),
    path('patientsrecordlist/', views.patient_records_create, name='patient_recordlist'),
    path('patientsrecordlistview/', views.patient_records_list, name='patient_recordlistview'),
    path('patientslistcreate/', views.PatientlistCreate.as_view(), name='patients_list_view'),
    path('patientdrop/',views.PatientDropList.as_view(), name='patient-id-list'),
    #path('patientrecords/', views.PatientRecordsListCreate.as_view(), name='patient_records_list_create'),
    path('patientinfo/<str:patient_id>/', views.get_patient_info, name='get_patient_info'),
    path('v1/patients/<str:patientId>/vitals', views.get_patient_vitals, name='patient-records-list'),
    path('patients/<str:patient_id>/', views.patient_detail, name='patient_detail'),
    path('patient_description/', views.patient_description, name='create_patient_description'),  # For POST
    path('patient_description/<str:patient_id>/', views.patient_description, name='patient_description_detail'),  # For GET and PUT

    
    path('', views.getRoutes),
    
]