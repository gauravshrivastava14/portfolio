"""
URL configuration for portfolio project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
    """
from django.contrib import admin
from django.urls import path
from main import views
from django.http import HttpResponse
from django.core.management import call_command

def run_migrations(request):
    call_command("migrate")
    call_command("collectstatic", "--noinput")
    return HttpResponse("✅ Migrations and static collection complete.")
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('tech/', views.tech, name='tech'),
    path('contact/', views.contact_view, name='contact'),
    path('certificates/', views.certificates, name='certificates'),
    path('blog/', views.blog, name='blog'),

    # 👇 Temporary migration trigger route
    path('run-migrations/', run_migrations),
]

