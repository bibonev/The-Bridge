from django.conf.urls import url, include
from . import views

# url patterns for customer/...abs
urlpatterns = [
    url(r'^$', views.dashboard, name='dashboard'), # load all posts on dashboard
]