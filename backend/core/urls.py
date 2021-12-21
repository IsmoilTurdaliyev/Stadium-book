from django.contrib import admin

from django.urls import path
from django.urls import include
from django.conf.urls import url

import orders.views as order
import stadiums.views as stadium

from .yasg import schema_view

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/v1/', include((stadium.urls, 'stadiums'))),
    path('api/v1/', include((order.urls, 'orders'))),
    path('api/v1/', include('accounts.urls')),

    url(
        r'^(?P<format>\.json|\.yaml)$',
        schema_view.without_ui(
            cache_timeout=0
        ),
        name='schema-json'
    ),
    url(
        r'^$', schema_view.with_ui(
            'swagger',
            cache_timeout=0
        ),
        name='schema-swagger'
    ),
    url(
        r'^redoc/$', schema_view.with_ui(
            'redoc',
            cache_timeout=0
        ), name='schema-redoc'
    ),

]
