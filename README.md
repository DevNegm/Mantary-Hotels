# Mantary-Hotels
🏨 Hotel Reservation System (Frontend)

A responsive React.js frontend application that allows users to view available hotel rooms, book them, and manage their reservations.
This project focuses on providing a clean UI, smooth user experience, and robust state management using Redux Toolkit.

🚀 Features
🔐 Authentication

Register and login with validation (dummy auth using localStorage + Redux).

User sessions are isolated — if multiple users log in from the same device, their data (bookings, cancellations) remain private.

Redirects for protected and unprotected routes.

🏠 Home Page

Displays a paginated list of all available rooms.

Each room card shows:

Room name & location

Type (Single, Double, Suite)

Price per night

Availability status

Filter rooms by:

Room Type

Price Range

Multiple Amenities ✅ (Bonus feature)

Date Range (checks against booked dates)

Sorting by price.
Price (High → Low / Low → High / All)

Fully responsive layout using Tailwind CSS.

🛏️ Room Details Page

Shows complete room information:

Description, amenities, capacity, price per night, and current availability.

Date picker for selecting check-in and check-out dates.

“Book Now” button visible only for authenticated users.

Success toast notification after booking.

👤 User Dashboard

View all booked reservations with dates and room details.

Cancel reservations.

Bonus feature: Added a separate table for canceled reservations, so users can review their past cancellations.

🧠 State Management

Handled using Redux Toolkit:

Auth Slice → handles login, signup, and user session.

Main Slice → manages all room data and availability.
handles bookings and cancellations.

LocalStorage is used for persistent user and reservation data.

🧰 Tech Stack
Technology	Purpose
React.js (Vite)	Frontend framework
Redux Toolkit	State management
React Router v7	Routing
Tailwind CSS Styling
Mantine	Date picker, modals, UI components
React Hook Form	Form handling & validation
React Icons	Icons
React Hot Toast	Notifications
💡 Bonus Features (Not Required in Task)

✅ User data isolation — multiple users on same device can’t see each other’s data.
✅ Filter by multiple amenities.
✅ Canceled reservations table in dashboard.
✅ Smooth scroll-to-section helper.
✅ Scroll-to-top on page change.
✅ Custom reusable form inputs with password toggle.
✅ Gradient navbar and styled scrollbars.
