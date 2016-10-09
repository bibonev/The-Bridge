from django.conf.urls import url, include
from . import views

# url patterns for cusotmer/...
urlpatterns = [
    url(r'^', include('posts.urls', namespace="posts")),
    url(r'organisations/$', views.organisations, name="organisations"),
    url(r'organisations/(?P<pk>\d+)/$', views.organisation_details, name='organisation_details'),
    url(r'organisations/(?P<pk>\d+)/reviews/$', views.organisation_details_reviews, name='organisation_details_reviews'),
]