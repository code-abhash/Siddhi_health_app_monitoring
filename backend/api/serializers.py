from api.models import User, Profile, Patient, PatientRecords
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model=User
        fields = ['id', 'username', 'email']

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token= super().get_token(user)

        token['role']= user.role
        token['username']= user.username
        token['email']= user.email
        # token['verified']= user.profile.verified

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
    