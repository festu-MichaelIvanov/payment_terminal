from django.contrib import admin

from core.models import CellOperator, UserBalance

admin.site.site_header = 'Payment terminal'


@admin.register(CellOperator)
class CellOperatorAdmin(admin.ModelAdmin):
    """
    Admin interface for cell operators
    """
    search_fields = ['name']


@admin.register(UserBalance)
class UserBalanceAdmin(admin.ModelAdmin):
    """
    Admin interface for user balances
    """
    list_display = ['user', 'cell_operator', 'phone', 'balance']
    autocomplete_fields = ['user', 'cell_operator']
