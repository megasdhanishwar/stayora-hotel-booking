import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  MapPin,
  Star,
  Users,
  BedDouble,
  Maximize2,
  Wifi,
  Coffee,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import SearchBar from "../components/SearchBar";

export default function RoomDetails() {
  const { id } = useParams();
  const { customRooms, search, notify } = useBooking();
  const room = customRooms.find((r) => String(r.id) === id);
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  if (!room)
    return (
      <div className="empty-state inner-page">
        <h2>Stay not found</h2>
        <Link to="/" className="btn btn-primary">
          Back home
        </Link>
      </div>
    );
  const images = room.gallery?.length ? room.gallery : [room.image];
  const nights =
    search.checkIn && search.checkOut
      ? Math.max(
          1,
          (new Date(search.checkOut) - new Date(search.checkIn)) / 86400000,
        )
      : 1;
  return (
    <div className="inner-page detail-page">
      <Link to="/search" className="back-link">
        <ArrowLeft size={16} /> Back to stays
      </Link>
      <div className="detail-heading">
        <div>
          <div className="section-kicker">{room.type.toUpperCase()}</div>
          <h1>{room.name}</h1>
          <p className="muted">
            <MapPin size={15} /> {room.location}, {room.country}{" "}
            <span className="dot-separator">·</span>{" "}
            <Star size={14} fill="currentColor" className="star-icon" />{" "}
            {room.rating} <span>({room.reviews} reviews)</span>
          </p>
        </div>
        <span className="detail-tag">{room.tag}</span>
      </div>
      <div className="gallery-grid">
        <div className="gallery-main">
          <img src={images[active]} alt={room.name} />
        </div>
        <div className="gallery-thumbs">
          {images.map((img, i) => (
            <button
              key={img + i}
              className={active === i ? "active" : ""}
              onClick={() => setActive(i)}
            >
              <img src={img} alt={`${room.name} view ${i + 1}`} />
            </button>
          ))}
        </div>
      </div>
      <div className="detail-columns">
        <div className="detail-main">
          <div className="detail-highlights">
            <div>
              <Users />
              <span>Up to {room.guests} guests</span>
            </div>
            <div>
              <BedDouble />
              <span>{room.beds}</span>
            </div>
            <div>
              <Maximize2 />
              <span>{room.size}</span>
            </div>
          </div>
          <h2>A little about this stay</h2>
          <p className="detail-description">{room.description}</p>
          <div className="detail-divider" />
          <h2>Thoughtful amenities</h2>
          <div className="amenity-grid">
            {room.amenities.map((a) => (
              <div key={a}>
                <Check size={16} />
                {a}
              </div>
            ))}
          </div>
          <div className="detail-divider" />
          <h2>House notes</h2>
          <p className="muted">
            Check-in from 2:00 PM · Check-out by 11:00 AM · Free cancellation up
            to 48 hours before arrival.
          </p>
        </div>
        <aside className="booking-card">
          <div className="booking-price">
            <strong>₹{Number(room.price).toLocaleString("en-IN")}</strong>
            <span>/ night</span>
          </div>
          <div className="booking-rating">
            <Star size={14} fill="currentColor" /> {room.rating}{" "}
            <span>· {room.reviews} reviews</span>
          </div>
          <div className="booking-mini-dates">
            <div>
              <small>CHECK IN</small>
              <strong>{search.checkIn || "Choose date"}</strong>
            </div>
            <div>
              <small>CHECK OUT</small>
              <strong>{search.checkOut || "Choose date"}</strong>
            </div>
          </div>
          <div className="booking-guests">
            <small>GUESTS</small>
            <strong>{search.guests} guests</strong>
          </div>
          <div className="booking-calculation">
            <span>
              ₹{Number(room.price).toLocaleString("en-IN")} × {nights} nights
            </span>
            <strong>₹{(room.price * nights).toLocaleString("en-IN")}</strong>
            <span>Taxes & fees</span>
            <strong>Included</strong>
          </div>
          <button
            className="btn btn-primary btn-full"
            onClick={() => {
              if (!search.checkIn || !search.checkOut) {
                notify("Choose your dates in the search bar first");
                document
                  .querySelector(".search-page-top")
                  ?.scrollIntoView({ behavior: "smooth" });
                return;
              }
              if (new Date(search.checkOut) <= new Date(search.checkIn)) {
                notify("Please select valid dates");
                return;
              }
              navigate(`/book/${room.id}`);
            }}
          >
            Reserve this stay <ArrowRight size={17} />
          </button>
          <p className="secure-note">
            No payment required for this demo booking
          </p>
        </aside>
      </div>
      <div className="detail-search">
        <h3>Planning your dates?</h3>
        <SearchBar compact />
      </div>
    </div>
  );
}
