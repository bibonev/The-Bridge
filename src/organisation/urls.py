from django.conf.urls import url
from . import views

# url patterns of organisation/...
urlpatterns = [
    url(r'^$', views.home_page, name='home'),
    url(r'^studio/$', views.organisation_studio, name='studio_organisation'),
    url(r'my_organisations/$', views.my_organisations, name='my_organisations'),
    url(r'my_organisations/(?P<pk>\d+)/$', views.my_organisation_details, name='my_organisation_details'),
    url(r'my_organisations/(?P<pk>\d+)/edit/$', views.my_organisation_edit, name='my_organisation_edit'),
    url(r'create_organisation/$', views.create_organisation, name='create_organisation'),
    url(r'requests/$', views.requests, name='requests'),
]