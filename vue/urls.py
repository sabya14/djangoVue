from django.conf.urls import url
from django.contrib import admin
from vue import views
urlpatterns = [
    url(r'^$',views.StoryList.as_view()),
    url(r'^(?P<pk>[0-9]+)$', views.StoryDetail.as_view()),
]