from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.home_page, name='home'),
    url(r'my_organisations/$', views.my_organisations, name='my_organisations'),
    url(r'my_organisations/(?P<pk>\d+)/$', views.my_organisation_details, name='my_organisation_details'),
    url(r'create_organisation/$', views.create_organisation, name='create_organisation'),
    url(r'(?P<pk>\d+)/friendship_request_list/$', views.friendship_request_list, name="request_list"),
]