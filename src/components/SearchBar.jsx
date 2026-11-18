import { CalendarDays, MapPin, Search, Users } from "lucide-react";
import { useBooking } from "../context/BookingContext";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ compact = false }) {
  const { search, setSearch, notify } = useBooking();
  const navigate = useNavigate();
  const update = (key, value) => setSearch((s) => ({ ...s, [key]: value }));
  const submit = (e) => {
    e.preventDefault();
    if (!search.destination.trim()) return notify("Please enter a destination");
    if (!search.checkIn || !search.checkOut)
      return notify("Select your check-in and check-out dates");
    if (new Date(search.checkOut) <= new Date(search.checkIn))
      return notify("Check-out must be after check-in");
    if (Number(search.guests) < 1 || Number(search.guests) > 10)
      return notify("Guests must be between 1 and 10");
    navigate("/search");
  };
  return (
    <form
      className={`search-panel ${compact ? "search-compact" : ""}`}
      onSubmit={submit}
    >
      <label className="search-field destination-field">
        <span>
          <MapPin size={16} /> Destination
        </span>
        <input
          value={search.destination}
          onChange={(e) => update("destination", e.target.value)}
          placeholder="Where to?"
        />
      </label>
      <label className="search-field">
        <span>
          <CalendarDays size={16} /> Check in
        </span>
        <input
          type="date"
          value={search.checkIn}
          min={new Date().toISOString().slice(0, 10)}
          onChange={(e) => update("checkIn", e.target.value)}
        />
      </label>
      <label className="search-field">
        <span>
          <CalendarDays size={16} /> Check out
        </span>
        <input
          type="date"
          value={search.checkOut}
          min={search.checkIn || new Date().toISOString().slice(0, 10)}
          onChange={(e) => update("checkOut", e.target.value)}
        />
      </label>
      <label className="search-field guests-field">
        <span>
          <Users size={16} /> Guests
        </span>
        <select
          value={search.guests}
          onChange={(e) => update("guests", Number(e.target.value))}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </label>
      <button className="btn btn-primary search-submit" type="submit">
        <Search size={17} /> Search stays
      </button>
    </form>
  );
}
