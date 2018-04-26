from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

from app.models import Item
from django.core import serializers

@csrf_exempt
def getList(request):
    items = Item.objects.all()
    print(items)
    res = []
    for item in items:
        res.append({"subject":item.subject,"content":item.content,"schedule_time":item.schedule_time,"status":item.status,"id":item.pk})
    print(res)
    return JsonResponse(res,safe=False)

@csrf_exempt
def add(request):
    item = Item(subject=request.POST['subject'],content=request.POST['content'],
                schedule_time=request.POST['schedule_time'],status=False)
    item.save()
    print(item.pk)
    return JsonResponse({"id":item.pk},safe=False)

@csrf_exempt
def delete(request):
    id = request.POST['id']
    try:
        item = Item.objects.get(pk=id)
        item.delete()
    except (KeyError, Item.DoesNotExist):
        print("delete fail")
    return HttpResponse("")

@csrf_exempt
def update(request):
    id = request.POST['id']
    print(id)
    try:
        item = Item.objects.get(pk=id)
        item.subject=request.POST['subject']
        item.content=request.POST['content']
        item.schedule_time=request.POST['schedule_time']
        item.save()
    except (KeyError, Item.DoesNotExist) as e:
        print("update fail")
        print(e)
    return HttpResponse("")

@csrf_exempt
def changeStatus(request):
    id = request.POST['id']
    try:
        item = Item.objects.get(pk=id)
        item.status=request.POST['status']=='true'
        item.save()
    except (KeyError, Item.DoesNotExist):
        print("change status fail")
    return HttpResponse("")