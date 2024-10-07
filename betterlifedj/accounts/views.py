from rest_framework import generics
from rest_framework.response import Response
from rest_framework.generics import UpdateAPIView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import loginSerializer
from .serializers import RegisterSerializer
from rest_framework import status
from users.models import User
from .serializers import EditSerializer

class loginView(generics.GenericAPIView):
    serializer_class = loginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access' : str(refresh.access_token),
        })
    
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

    # Asegurarse de que solo se permiten métodos POST
    def get(self, request, *args, **kwargs):
        return Response({"detail": "Method 'GET' not allowed."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class EditProfileView(UpdateAPIView): 
    queryset = User.objects.all()
    serializer_class = EditSerializer

    def get_object(self):
        return self.request.user