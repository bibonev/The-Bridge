from django.conf.urls import url, include
from . import views

# url patterns for cusotmer/...
urlpatterns = [
    url(r'^', include('posts.urls', namespace="posts")), #load all posts 
    url(r'^requests/$', views.customer_requests, name="requests"), # customer requests and bookmarks
    url(r'^organisations/$', views.organisations, name="organisations"), # load all organisations
    url(r'^organisations/(?P<pk>\d+)/$', views.organisation_view, name='organisation_view'), # load a current organisation
    #url(r'^organisations/(?P<pk>\d+)/reviews/$', views.organisation_details_reviews, name='organisation_details_reviews'), # load all reviews of the current organisation
]