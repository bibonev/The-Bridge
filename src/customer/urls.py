from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.home_page, name='home'),
    url(r'organisations/$', views.organisations, name="organisations"),
    url(r'organisations/(?P<pk>\d+)/$', views.organisation_details, name='organisation_details'),
]