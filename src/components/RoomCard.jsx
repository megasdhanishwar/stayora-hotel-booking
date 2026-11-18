import { ArrowUpRight, MapPin, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function RoomCard({ room }) {
  return (
    <article className="room-card">
      <Link to={`/rooms/${room.id}`} className="room-image-wrap">
        <img src={room.image} alt={room.name} className="room-image" />
        <span className="image-tag">{room.tag}</span>
        <span className="image-arrow">
          <ArrowUpRight size={18} />
        </span>
      </Link>
      <div className="room-card-content">
        <div className="room-card-top">
          <span className="eyebrow">{room.type}</span>
          <span className="rating">
            <Star size={14} fill="currentColor" /> {room.rating}{" "}
            <small>({room.reviews})</small>
          </span>
        </div>
        <Link to={`/rooms/${room.id}`} className="room-title">
          {room.name}
        </Link>
        <div className="muted room-location">
          <MapPin size={14} /> {room.location}
        </div>
        <div className="room-card-bottom">
          <div>
            <strong>₹{Number(room.price).toLocaleString("en-IN")}</strong>
            <span className="muted"> / night</span>
          </div>
          <span className="muted">
            <Users size={14} /> Up to {room.guests}
          </span>
        </div>
      </div>
    </article>
  );
}
