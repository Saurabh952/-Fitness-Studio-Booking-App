from django.core.management.base import BaseCommand
from booking.models import FitnessClass
from django.utils.timezone import now
from datetime import timedelta

class Command(BaseCommand):
    help = 'Seed initial fitness classes'

    def handle(self, *args, **kwargs):
        FitnessClass.objects.all().delete()
        FitnessClass.objects.create(
            name="Yoga",
            date_time=now() + timedelta(days=1),
            instructor="Alice",
            total_slots=10,
            available_slots=10
        )
        FitnessClass.objects.create(
            name="Zumba",
            date_time=now() + timedelta(days=2),
            instructor="Bob",
            total_slots=15,
            available_slots=15
        )
        self.stdout.write(self.style.SUCCESS("Seeded data"))
