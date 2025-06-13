from django.contrib import admin
from django.urls import path
from booking import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('classes/', views.classes_list),
    path('book/', views.book_class),
    path('bookings/', views.get_bookings),
]
