from django.conf.urls import url
from . import views

# url patterns of organisation/...
urlpatterns = [
    url(r'^studio/(?P<pk>\d+)/$', views.organisation_studio, name='studio_organisation'),
    url(r'^my_organisations/(?P<pk>\d+)/edit/$', views.my_organisation_edit, name='my_organisation_edit'),
    url(r'^create_organisation/$', views.create_organisation, name='create_organisation'),
]