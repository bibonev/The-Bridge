from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^users/$', views.UserListAPIView.as_view(), name="users_api"),
    url(r'^organisations/$', views.OrganisationListAPIView.as_view(), name="organisations_list_api"),
    url(r'^organisations/(?P<pk>\d+)/$', views.OrganisationRetrieveAPIView.as_view(), name="organisations_retrieve_api"),
    url(r'^organisations/(?P<pk>\d+)/edit_bookmark/$', views.OrganisationUpdateBookmarkAPIView.as_view(), name="organisation_update_bookmark_api"),
    url(r'^organisations/currentUserBookmarks/$', views.OrganisationCurrUserBookmarkAPIView.as_view(), name="organisation_curr_user_bookmark_api"),
    url(r'^organisations/currentUser/$', views.OrganisationCurrUserListAPIView.as_view(), name="organisations_curr_user_api"),
    url(r'^organisations/is_organisation/(?P<pk>\d+)/$', views.OrganisationIsCurrUserAPIView.as_view(), name="organisations_is_curr_user_api"),
    url(r'^organisations/(?P<pk>\d+)/reviews/$', views.ReviewListAPIView.as_view(), name="reviews_list_api"),
    url(r'^organisations/reviews/(?P<pk>\d+)/$', views.ReviewRetrieveAPIView.as_view(), name="reviews_retrieve_api"),
    url(r'^organisations/(?P<pk>\d+)/reviews/create/$', views.ReviewCreateAPIView.as_view(), name="reviews_create_api"),
    url(r'^posts/$', views.PostListAPIView.as_view(), name="posts_list_api"),
    url(r'^posts/(?P<pk>\d+)/$', views.PostRetrieveAPIView.as_view(), name="posts_retrieve_api"),
    url(r'^posts/create/$', views.PostCreateAPIView.as_view(), name="posts_create_api"),
    url(r'^comments/$', views.CommentListAPIView.as_view(), name="comments_list_api"),
    url(r'^comments/(?P<pk>\d+)/$', views.CommentRetrieveAPIView.as_view(), name="comments_retrieve_api"),
    url(r'^comments/create/$', views.CommentCreateAPIView.as_view(), name="comments_create_api"),
    url(r'^pending_requests/$', views.PendingRequestListAPIView.as_view(), name="pending_requests_list_api"),
    url(r'^pending_requests/result/$', views.PendingRequestResultListAPIView.as_view(), name="result_pending_requests_list_api"),
    url(r'^pending_requests/currentUser/$', views.PendingRequestCurrUserListAPIView.as_view(), name="pending_requests_current_user_list_api"),
    url(r'^relations/$', views.RelationListAPIView.as_view(), name="relations_list_api"),
    url(r'^relations/currentUser/$', views.RelationCurrUserListAPIView.as_view(), name="relations_current_user_list_api"),

]