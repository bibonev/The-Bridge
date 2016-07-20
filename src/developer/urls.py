from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.home_page, name='home'),
    url(r'create_organisation/$', views.create_organisation, name='create_organisation')
]