from api.models import User, Profile, Patient, PatientRecords,PatientDescription
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model=User
        fields = ['id','username', 'email',]

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token= super().get_token(user)

        token['role']= user.role
        token['username']= user.username
        token['email']= user.email

        return token
    

class RegisterSerializer(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2=serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['email', 'username','role', 'password', 'password2']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            role=validated_data['role']

        )

        user.set_password(validated_data['password'])
        user.save()

        return user
    
class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model=Patient
        fields='__all__'


class PatientRecordsSerializer(serializers.ModelSerializer):
    class Meta:
        model=PatientRecords
        fields= '__all__'

    
class PatientDropSerializer(serializers.ModelSerializer):
    class Meta:
        model=Patient
        fields=['patientId','patientName','doctorName']

class EditablePatientRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model=Patient
        fields=['patientName','doctorName','medConditions','bed']

class PatientDescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model=PatientDescription
        fields='__all__'

class EditPatientDescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model=PatientDescription
        fields=['description','treatment','diagnosis','symptoms']

from rest_framework import serializers
from api.models import User 
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.conf import settings
from django.urls import reverse

class PasswordResetSerializer(serializers.Serializer):
    username = serializers.CharField()

    def validate_username(self, value):
        if not User.objects.filter(username=value).exists():
            raise serializers.ValidationError("There is no user registered with this username.")
        return value

    def send_password_reset_email(self, user):
        token = default_token_generator.make_token(user)
        
        full_url = f"http://localhost:5173/reset/{user.username}/{token}/"
        send_mail(
            'Password Reset Request',
            f'Click the link to reset your password: {full_url}',
            settings.DEFAULT_FROM_EMAIL,
            [user.email]
        )

    def save(self):
        username = self.validated_data['username']
        user = User.objects.get(username=username)
        self.send_password_reset_email(user)



class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

    