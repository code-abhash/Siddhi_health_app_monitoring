from api.models import User, Profile, Patient, PatientRecords,PatientDescription
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

#User serilizer is to register new user
class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model=User
        fields = ['id','username', 'email',]

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):# MyTokenObtainPairSerializer is used to obtain a token, including custom claims like role, username, and email.
    @classmethod
    def get_token(cls, user):
        token= super().get_token(user)

        token['role']= user.role
        token['username']= user.username
        token['email']= user.email

        return token
    
# RegisterSerializer is used for user registration, including password validation and confirmation.
class RegisterSerializer(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2=serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['email', 'username','role', 'password', 'password2']
     # Custom validation to check if the two passwords match.
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs
     # Creating a new user with the validated data.
    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            role=validated_data['role']

        )

        user.set_password(validated_data['password'])
        user.save()

        return user

# PatientSerializer is used to serialize all fields of the Patient model.    
class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model=Patient
        fields='__all__'

# PatientRecordsSerializer is used to serialize all fields of the PatientRecords model.
class PatientRecordsSerializer(serializers.ModelSerializer):
    class Meta:
        model=PatientRecords
        fields= '__all__'

# PatientDropSerializer is used to serialize a subset of fields of the Patient model its to get these field in dropdown    
class PatientDropSerializer(serializers.ModelSerializer):
    class Meta:
        model=Patient
        fields=['patientId','patientName','doctorName']

# EditablePatientRecordSerializer is used to serialize editable fields of the Patient model.
class EditablePatientRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model=Patient
        fields=['patientName','doctorName','medConditions','bed']

# PatientDescriptionSerializer is used to serialize all fields of the PatientDescription model.
class PatientDescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model=PatientDescription
        fields='__all__'

# EditPatientDescriptionSerializer is used to serialize editable fields of the PatientDescription model.
class EditPatientDescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model=PatientDescription
        fields=['description','treatment','diagnosis','symptoms']

from rest_framework import serializers
from api.models import User 
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.conf import settings

# PasswordResetSerializer is used to handle password reset requests.
class PasswordResetSerializer(serializers.Serializer):
    username = serializers.CharField()

     # Validating the username to ensure the user exists.
    def validate_username(self, value):
        if not User.objects.filter(username=value).exists():
            raise serializers.ValidationError("There is no user registered with this username.")
        return value
      
     # Sending a password reset email to the user.  
    def send_password_reset_email(self, user):
        token = default_token_generator.make_token(user)
        
        full_url = f"http://localhost:5173/reset/{user.username}/{token}/"
        send_mail(
            'Password Reset Request',
            f'Dear {user.username},\n\n We recieved password request.'
            f'Click the link to reset your password: {full_url}\n\n\n Thank you, \n for your regards',
            settings.DEFAULT_FROM_EMAIL,
            [user.email]
        )
     # Saving the validated data and sending the reset email.
    def save(self):
        username = self.validated_data['username']
        user = User.objects.get(username=username)
        self.send_password_reset_email(user)


# ProfileSerializer is used to serialize all fields of the Profile model.
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

    