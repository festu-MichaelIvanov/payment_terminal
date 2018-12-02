from django.contrib import admin
from django.conf.urls import include
from django.urls import path

from rest_framework import routers

from core.views import IndexView
from core.viewsets import CellOperatorViewSet, CustomLogin, CustomLogout, UserBalanceViewSet


router = routers.DefaultRouter()
router.register(r'cell-operators', CellOperatorViewSet)
router.register(r'user-balance', UserBalanceViewSet, 'user-balance')

urlpatterns = [
    path('', IndexView.as_view()),
    path('cell-operators/', IndexView.as_view()),
    path('cell-operators/<int:id>/', IndexView.as_view()),
    path('login/', IndexView.as_view()),
    path('api/', include(router.urls)),
    path('api-login/', CustomLogin.as_view()),
    path('api-logout/', CustomLogout.as_view()),
    path('admin/', admin.site.urls),
]
