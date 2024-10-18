from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CalculationSerializer
from .utils import (
    formulaHarrisBenedict,
    formulaMifflinStJeor,
    formulaIMC,
    formulaWaterRequirement
    )

class CalculationView(APIView):
    def post(self, request):
        serializer = CalculationSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user

            weight = user.weight
            height = user.height
            age = user.age
            sex = user.sex
            activity = user.activity  
            formula = serializer.validated_data['formula']

            if not all ([weight, height, age, sex, activity]):
                return Response({"Error":"Faltan datos en el perfil del usuario."}, status=status.HTTP_400_BAD_REQUEST)
            
            if formula == 'harris':
                tbm = formulaHarrisBenedict(weight, height, age, sex, activity)
            else: #formula == 'mifflin'
                tbm = formulaMifflinStJeor(weight, height, age, sex, activity)

            waterRequirement = formulaWaterRequirement(weight)
            imc = formulaIMC(weight, height)

            user.basalmetabolism = tbm
            user.waterrequirement = waterRequirement
            user.bodymassindex = imc
            user.save()

            return Response({
            'tbm' : tbm,
            'water_requirement' : waterRequirement, 
            'imc' : imc,
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)