from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from booking.models import FitnessClass, Booking
from django.utils.timezone import localtime
import json

def classes_list(request):
    classes = FitnessClass.objects.filter(date_time__gte=localtime())
    data = [
        {
            "id": c.id,
            "name": c.name,
            "date_time": localtime(c.date_time).isoformat(),
            "instructor": c.instructor,
            "available_slots": c.available_slots
        }
        for c in classes
    ]
    return JsonResponse(data, safe=False)

@csrf_exempt
def book_class(request):
    if request.method != 'POST':
        return JsonResponse({"error": "Only POST allowed"}, status=405)

    try:
        data = json.loads(request.body)
        class_id = data['class_id']
        client_name = data['client_name']
        client_email = data['client_email']
    except (KeyError, json.JSONDecodeError):
        return JsonResponse({"error": "Missing or invalid fields"}, status=400)

    try:
        fclass = FitnessClass.objects.get(id=class_id)
    except FitnessClass.DoesNotExist:
        return JsonResponse({"error": "Class not found"}, status=404)

    if fclass.available_slots <= 0:
        return JsonResponse({"error": "No slots available"}, status=400)

    Booking.objects.create(
        fitness_class=fclass,
        client_name=client_name,
        client_email=client_email
    )
    fclass.available_slots -= 1
    fclass.save()

    return JsonResponse({"success": "Booking confirmed"})

def get_bookings(request):
    email = request.GET.get('email')
    if not email:
        return JsonResponse({"error": "Email required"}, status=400)

    bookings = Booking.objects.filter(client_email=email)
    data = [
        {
            "class": b.fitness_class.name,
            "date_time": localtime(b.fitness_class.date_time).isoformat(),
            "instructor": b.fitness_class.instructor
        }
        for b in bookings
    ]
    return JsonResponse(data, safe=False)
