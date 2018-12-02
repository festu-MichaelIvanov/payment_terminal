from django.contrib.auth import login, logout
from django.contrib.auth.models import User

from rest_framework import viewsets, views, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from core.models import CellOperator, UserBalance
from core.serializers import CellOperatorSerializer, CustomLoginSerializer, UserBalanceSerializer


class CustomLogin(views.APIView):
    """
    Custom api endpoint login
    """
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = CustomLoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({'message': 'bad signature for email/password'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            try:
                user = User.objects.get(email=serializer.validated_data.get('email'))
            except User.DoesNotExist:
                return Response({'message': 'user with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
            if not user.check_password(serializer.validated_data.get('password')):
                return Response({'message': 'bad password'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                login(request, user)
                return Response({'message': 'success', 'email': user.email}, status=status.HTTP_200_OK)


class CustomLogout(views.APIView):
    """
    Custom api endpoint logout
    """
    def post(self, request, *args, **kwargs):
        logout(request)
        return Response({'message': 'success'}, status=status.HTTP_200_OK)


class CellOperatorViewSet(viewsets.ModelViewSet):
    """
    Api endpoint for list of cell operators
    """
    queryset = CellOperator.objects.all()
    serializer_class = CellOperatorSerializer


class UserBalanceViewSet(viewsets.ModelViewSet):
    """
    Api endpoint for user balances by cell operator
    """
    serializer_class = UserBalanceSerializer

    def get_queryset(self):
        balances = UserBalance.objects.filter(user=self.request.user,
                                              cell_operator__id=self.request.query_params['cell_operator_id'])
        return balances

    @action(detail=False, methods=['post'], url_path='create-or-update-user-balance')
    def create_or_update_user_balance(self, request):
        """
        Custom action for create or update user balance per cell operator and phone number
        :param request.data - cell_operator, phone, balance
        :return: user balances list per cell operator
        """
        serializer = UserBalanceSerializer(data=request.data)
        if not serializer.is_valid():
            Response({'message': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        UserBalance.objects.update_or_create(
            user=self.request.user, cell_operator=serializer.validated_data.get('cell_operator'),
            phone=serializer.validated_data.get('phone'), defaults={'balance': serializer.validated_data.get('balance')}
        )
        return Response(
            UserBalanceSerializer(
                UserBalance.objects.filter(user=self.request.user,
                                           cell_operator=serializer.validated_data.get('cell_operator'))
                , many=True
            ).data,
            status=status.HTTP_200_OK
        )
