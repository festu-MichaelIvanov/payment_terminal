from django.db import models
from django.contrib.auth.models import User


class CellOperator(models.Model):
    """
    Cell operator model for DB table
    """
    name = models.CharField(verbose_name='Cell operator', max_length=255)

    class Meta:
        verbose_name = 'Cell operator'
        verbose_name_plural = 'Cell operators'

    def __str__(self):
        return self.name


class UserBalance(models.Model):
    """
    User balance model for DB table
    """
    user = models.ForeignKey(User, verbose_name='User', on_delete=models.CASCADE, related_name='user_balances')
    cell_operator = models.ForeignKey(CellOperator, on_delete=models.CASCADE, verbose_name='Cell operator',
                                      related_name='user_balances')
    phone = models.CharField(verbose_name='Phone', max_length=16)
    balance = models.PositiveIntegerField(verbose_name='Balance')

    class Meta:
        verbose_name = 'User balance'
        verbose_name_plural = 'User balances'

    def __str__(self):
        return '{}-{}-{}'.format(self.user.email, self.cell_operator.name, self.phone)
