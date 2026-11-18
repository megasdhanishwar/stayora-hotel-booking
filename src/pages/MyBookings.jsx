import {
  CalendarDays,
  MapPin,
  XCircle,
  ArrowUpRight,
  CalendarCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useBooking } from "../context/BookingContext";

export default function MyBookings() {
  const { bookings, cancelBooking, notify } = useBooking();
  const confirmCancel = (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?"))
      cancelBooking(id);
  };
  return (
    <div className="inner-page my-bookings-page">
      <div className="section-kicker">YOUR TRAVEL JOURNAL</div>
      <div className="page-title-row">
        <div>
          <h1>
            My <em>bookings.</em>
          </h1>
          <p className="muted">Every good trip starts with a plan.</p>
        </div>
        <Link to="/search" className="btn btn-primary">
          Find a stay <ArrowUpRight size={17} />
        </Link>
      </div>
      {bookings.length ? (
        <div className="my-bookings-list">
          {bookings.map((b) => (
            <article
              className={`my-booking-card ${b.status === "Cancelled" ? "cancelled-card" : ""}`}
              key={b.id}
            >
              <img src={b.roomImage} alt={b.roomName} />
              <div className="my-booking-content">
                <div className="booking-row-top">
                  <span className="eyebrow">{b.id}</span>
                  <span
                    className={`status-pill ${b.status === "Confirmed" ? "confirmed" : "cancelled"}`}
                  >
                    {b.status}
                  </span>
                </div>
                <h2>{b.roomName}</h2>
                <p className="muted">
                  <MapPin size={14} />
                  {b.location}
                </p>
                <div className="my-booking-meta">
                  <span>
                    <CalendarDays size={14} />
                    {b.checkIn} — {b.checkOut}
                  </span>
                  <span>
                    {b.nights} nights · {b.guests} guests
                  </span>
                </div>
              </div>
              <div className="my-booking-side">
                <strong>₹{b.total.toLocaleString("en-IN")}</strong>
                <small>Total amount</small>
                {b.status === "Confirmed" ? (
                  <button
                    className="cancel-link"
                    onClick={() => confirmCancel(b.id)}
                  >
                    <XCircle size={15} /> Cancel booking
                  </button>
                ) : (
                  <span className="cancelled-note">Cancelled</span>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state bookings-empty">
          <div className="empty-icon">
            <CalendarCheck />
          </div>
          <h2>No trips on the calendar. Yet.</h2>
          <p>Your next favourite place is just a search away.</p>
          <Link to="/search" className="btn btn-primary">
            Explore stays <ArrowUpRight size={17} />
          </Link>
        </div>
      )}
    </div>
  );
}
