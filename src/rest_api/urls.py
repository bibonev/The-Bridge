from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'organisations/$', views.ListOrganisation.as_view(), name="organisations_api"),
]