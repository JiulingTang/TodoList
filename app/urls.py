from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'item/get/$', views.getList, name='getList'),
    url(r'item/add/$', views.add, name='add'),
    url(r'item/delete/$',views.delete,name='delete'),
    url(r'item/update/$',views.update,name='update'),
    url(r'item/changeStatus/$',views.changeStatus,name='changeStatus')
]