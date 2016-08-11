from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'organisations/$', views.ListOrganisation.as_view(), name="organisations_api"),
    url(r'organisations/(?P<pk>\d+)/$', views.RetrieveOrganisation.as_view(), name="organisation_details_api"),
]