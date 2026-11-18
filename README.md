# Stayora — Hotel Booking Management System

A responsive React + Vite hotel booking experience built with sample data and browser `localStorage`.

## Run locally

1. Extract the ZIP.
2. Open the extracted `stayora-hotel-booking` folder in VS Code.
3. Open a terminal in that folder.
4. Run:

```bash
npm install
npm run dev
```

5. Open the local URL printed by Vite (usually `http://localhost:5173`).

## Included modules

- Hotel landing page and featured room catalogue
- Room details, image gallery, amenities and pricing
- Destination, check-in, check-out and guest search
- Sample availability results with category, price and sort filters
- Guest information and booking validation
- Booking confirmation with generated reference
- My Bookings list and cancellation interaction
- Admin overview, room CRUD and pricing management
- Booking management dashboard
- Customer profile and notification settings
- Responsive navigation, animations, gradient actions, toast messages and empty states

## Demo notes

- All listings and bookings are sample data.
- Bookings, room edits and profile changes are stored in `localStorage`.
- No real payment, hotel API or backend is connected.
- The initial sample profile is Alex Morgan. You can edit it from Profile.
- Admin actions are demo UI actions and are not protected by authentication.

## Main structure

```text
src/
  components/
  context/
  data/
  pages/
  App.jsx
  main.jsx
  styles.css
```
