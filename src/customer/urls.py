from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.home_page, name='home'),
    url(r'organisations/(?P<pk>\d+)/$', views.organisation_details, name='organisation_details'),
    url(r'organisations/search/(?P<title>[\w\-]+)/$', views.organisation_details_search_by_title, name='organisation_details_search_by_title'),
]