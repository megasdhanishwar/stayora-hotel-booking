import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ShieldCheck } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useBooking } from "../context/BookingContext";

export default function Booking() {
  const { id } = useParams();
  const { customRooms, search, profile, createBooking, notify } = useBooking();
  const room = customRooms.find((r) => String(r.id) === id);
  const [guest, setGuest] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    requests: "",
  });
  const [accepted, setAccepted] = useState(true);
  const navigate = useNavigate();
  const nights = useMemo(
    () =>
      search.checkIn && search.checkOut
        ? Math.max(
            0,
            (new Date(search.checkOut) - new Date(search.checkIn)) / 86400000,
          )
        : 0,
    [search],
  );
  if (!room)
    return (
      <div className="empty-state inner-page">
        <h2>Stay not found</h2>
        <Link to="/" className="btn btn-primary">
          Back home
        </Link>
      </div>
    );
  const submit = (e) => {
    e.preventDefault();
    if (!search.checkIn || !search.checkOut || nights < 1) {
      notify("Please choose valid check-in and check-out dates");
      return;
    }
    if (Number(search.guests) > room.guests) {
      notify(`This room allows up to ${room.guests} guests`);
      return;
    }
    if (
      !guest.name.trim() ||
      !guest.email.includes("@") ||
      guest.phone.trim().length < 8
    ) {
      notify("Please enter valid guest information");
      return;
    }
    if (!accepted) {
      notify("Please accept the booking terms");
      return;
    }
    const booking = createBooking({
      roomId: room.id,
      roomName: room.name,
      roomImage: room.image,
      location: room.location,
      price: room.price,
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      nights,
      guests: Number(search.guests),
      total: room.price * nights,
      guest,
    });
    navigate(`/confirmation/${booking.id}`);
  };
  return (
    <div className="inner-page booking-page">
      <Link to={`/rooms/${room.id}`} className="back-link">
        <ArrowLeft size={16} /> Back to room
      </Link>
      <div className="section-kicker">ALMOST THERE</div>
      <h1>
        Make it <em>official.</em>
      </h1>
      <p className="muted">
        A few details and your next getaway is on its way.
      </p>
      <div className="booking-layout">
        <form className="guest-form" onSubmit={submit}>
          <div className="form-section">
            <div className="form-section-heading">
              <span>01</span>
              <div>
                <h2>Guest information</h2>
                <p>Who will be checking in?</p>
              </div>
            </div>
            <div className="form-grid">
              <label className="form-field full-field">
                Full name
                <input
                  required
                  value={guest.name}
                  onChange={(e) => setGuest({ ...guest, name: e.target.value })}
                  placeholder="Your full name"
                />
              </label>
              <label className="form-field">
                Email address
                <input
                  type="email"
                  required
                  value={guest.email}
                  onChange={(e) =>
                    setGuest({ ...guest, email: e.target.value })
                  }
                  placeholder="you@example.com"
                />
              </label>
              <label className="form-field">
                Phone number
                <input
                  required
                  value={guest.phone}
                  onChange={(e) =>
                    setGuest({ ...guest, phone: e.target.value })
                  }
                  placeholder="+91 98765 43210"
                />
              </label>
              <label className="form-field full-field">
                Special requests <span className="optional">(optional)</span>
                <textarea
                  rows="3"
                  value={guest.requests}
                  onChange={(e) =>
                    setGuest({ ...guest, requests: e.target.value })
                  }
                  placeholder="Anything you'd like us to know?"
                />
              </label>
            </div>
          </div>
          <div className="form-section">
            <div className="form-section-heading">
              <span>02</span>
              <div>
                <h2>Booking preferences</h2>
                <p>Your selected stay details.</p>
              </div>
            </div>
            <div className="preference-summary">
              <div>
                <small>CHECK-IN</small>
                <strong>{search.checkIn}</strong>
              </div>
              <div>
                <small>CHECK-OUT</small>
                <strong>{search.checkOut}</strong>
              </div>
              <div>
                <small>GUESTS</small>
                <strong>{search.guests}</strong>
              </div>
            </div>
          </div>
          <label className="terms-check">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
            />
            <span>I agree to the booking terms and cancellation policy.</span>
          </label>
          <button className="btn btn-primary btn-full" type="submit">
            Confirm booking <ArrowRight size={17} />
          </button>
          <p className="secure-note">
            <ShieldCheck size={14} /> Secure demo checkout · No payment will be
            collected
          </p>
        </form>
        <aside className="order-summary">
          <img src={room.image} alt={room.name} />
          <div className="summary-room">
            <span className="eyebrow">{room.type}</span>
            <h3>{room.name}</h3>
            <p>{room.location}</p>
          </div>
          <div className="summary-rule" />
          <div className="summary-line">
            <span>
              ₹{room.price.toLocaleString("en-IN")} × {nights} nights
            </span>
            <strong>₹{(room.price * nights).toLocaleString("en-IN")}</strong>
          </div>
          <div className="summary-line">
            <span>Taxes & fees</span>
            <strong>Included</strong>
          </div>
          <div className="summary-rule" />
          <div className="summary-total">
            <span>Total amount</span>
            <strong>₹{(room.price * nights).toLocaleString("en-IN")}</strong>
          </div>
          <div className="summary-included">
            <Check size={15} /> Free cancellation up to 48 hours before arrival
          </div>
        </aside>
      </div>
    </div>
  );
}
