from rest_framework import serializers

from core.models import CellOperator, UserBalance


class CustomLoginSerializer(serializers.Serializer):
    """
    Serializer for custom login viewset
    """
    email = serializers.CharField()
    password = serializers.CharField()


class CellOperatorSerializer(serializers.ModelSerializer):
    """
     Serializer for cell operators viewset
     """

    class Meta:
        model = CellOperator
        fields = '__all__'


class UserBalanceSerializer(serializers.ModelSerializer):
    """
     Serializer for user balances viewset
     """
    cell_operator = serializers.PrimaryKeyRelatedField(queryset=CellOperator.objects.all(), write_only=True)

    class Meta:
        model = UserBalance
        fields = ['id', 'phone', 'cell_operator', 'balance']
