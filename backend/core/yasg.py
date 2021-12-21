from rest_framework.permissions import AllowAny

from drf_yasg import openapi
from drf_yasg.views import get_schema_view


description: str = """
Backend(API) written in python (django) for Stadium Booking APP project!
"""

schema_view = get_schema_view(
    openapi.Info(
        title="Stadium-Booking-API",
        default_version="v1",
        description=description,
        license=openapi.License(name="MIT License"),
        contact=openapi.Contact(email="abduaziz.ziyodov@mail.ru"),
    ),
    public=True,
    permission_classes=(AllowAny,),
)
