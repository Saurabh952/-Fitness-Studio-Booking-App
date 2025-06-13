🏋️‍♂️ Fitness Studio Booking App


A full-stack web application built using Django (backend) and React.js + Material-UI (frontend) for managing and booking fitness classes like Yoga, Zumba, and HIIT.

This app allows users to:

Browse available fitness classes

Book a spot

View their bookings

It showcases clean API design, responsive UI/UX, timezone management, and error handling, built for demonstration and evaluation of full-stack development skills.

🚀 Features

✅ Backend (Django + SQLite)

RESTful API built using Django

Endpoints:

GET /classes/ → List upcoming fitness classes with name, date/time (timezone-aware), instructor, available slots

POST /book/ → Book a spot (validates availability, decrements slots on success)

GET /bookings/?email=xyz@abc.com → View bookings by client email

In-memory (SQLite) database with seed data

Timezone-aware class times (default IST, dynamic based on client zone)

Input validation and proper error handling (e.g., prevent overbooking)

CORS-enabled for frontend integration

Basic logging of API requests

✅ Frontend (React + Material-UI)

Clean, modern, responsive UI

Interactive class list with booking buttons (disabled if full)

Booking form with form validation (required fields, email format)

Visual feedback using Material-UI (loading indicators, success/error alerts)

Booking history display for a user’s email

Consumes Django APIs using Axios

Easy to extend with theme or dark mode
