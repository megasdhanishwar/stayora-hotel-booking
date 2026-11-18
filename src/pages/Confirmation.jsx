import { ArrowRight, CalendarCheck, Check, MapPin, Share2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useBooking } from "../context/BookingContext";

export default function Confirmation() {
  const { id } = useParams();
  const { bookings } = useBooking();
  const booking = bookings.find((b) => b.id === id);
  if (!booking)
    return (
      <div className="empty-state inner-page">
        <h2>We couldn't find that booking</h2>
        <Link to="/my-bookings" className="btn btn-primary">
          View my bookings
        </Link>
      </div>
    );
  return (
    <div className="confirmation-page inner-page">
      <div className="success-orb">
        <Check size={34} />
      </div>
      <div className="section-kicker">IT'S A DATE</div>
      <h1>
        Your stay is <em>confirmed.</em>
      </h1>
      <p className="muted">
        All set, {booking.guest.name.split(" ")[0]}. We've saved your booking
        details right here.
      </p>
      <div className="confirmation-card">
        <div className="confirmation-card-top">
          <div>
            <span className="eyebrow">BOOKING REFERENCE</span>
            <h3>{booking.id}</h3>
          </div>
          <span className="status-pill confirmed">Confirmed</span>
        </div>
        <img src={booking.roomImage} alt={booking.roomName} />
        <div className="confirmation-info">
          <h2>{booking.roomName}</h2>
          <p>
            <MapPin size={14} />
            {booking.location}
          </p>
          <div className="confirmation-details">
            <div>
              <small>CHECK-IN</small>
              <strong>{booking.checkIn}</strong>
            </div>
            <div>
              <small>CHECK-OUT</small>
              <strong>{booking.checkOut}</strong>
            </div>
            <div>
              <small>GUESTS</small>
              <strong>{booking.guests}</strong>
            </div>
            <div>
              <small>DURATION</small>
              <strong>{booking.nights} nights</strong>
            </div>
          </div>
          <div className="confirmation-total">
            <span>Total paid</span>
            <strong>₹{booking.total.toLocaleString("en-IN")}</strong>
            <small>Demo booking · No payment collected</small>
          </div>
        </div>
      </div>
      <div className="confirmation-actions">
        <Link to="/my-bookings" className="btn btn-primary">
          View my bookings <ArrowRight size={17} />
        </Link>
        <Link to="/" className="btn btn-outline">
          Back to discover
        </Link>
      </div>
      <p className="confirmation-foot">
        <CalendarCheck size={15} /> Your booking is saved in this browser.
      </p>
    </div>
  );
}
