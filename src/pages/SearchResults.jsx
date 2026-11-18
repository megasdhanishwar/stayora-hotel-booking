import { useMemo, useState } from "react";
import {
  SlidersHorizontal,
  MapPin,
  CalendarDays,
  Users,
  ArrowUpDown,
} from "lucide-react";
import RoomCard from "../components/RoomCard";
import SearchBar from "../components/SearchBar";
import { useBooking } from "../context/BookingContext";

export default function SearchResults() {
  const { customRooms, search } = useBooking();
  const [category, setCategory] = useState("All stays");
  const [sort, setSort] = useState("recommended");
  const [maxPrice, setMaxPrice] = useState(12000);
  const results = useMemo(() => {
    let list = customRooms.filter(
      (r) =>
        (!search.destination ||
          `${r.city} ${r.location}`
            .toLowerCase()
            .includes(search.destination.toLowerCase())) &&
        r.guests >= Number(search.guests) &&
        r.price <= maxPrice &&
        (category === "All stays" || r.category === category),
    );
    if (sort === "price-low") list.sort((a, b) => a.price - b.price);
    if (sort === "price-high") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [customRooms, search, category, sort, maxPrice]);
  const nights =
    search.checkIn && search.checkOut
      ? Math.max(
          0,
          (new Date(search.checkOut) - new Date(search.checkIn)) / 86400000,
        )
      : 0;
  return (
    <div className="inner-page">
      <div className="search-page-top">
        <div className="section-kicker">FIND YOUR PLACE</div>
        <h1>
          Places to <em>call yours.</em>
        </h1>
        <p className="muted">
          A few good options, picked for your kind of getaway.
        </p>
        <SearchBar compact />
      </div>
      <div className="results-layout">
        <aside className="filter-panel">
          <div className="filter-title">
            <SlidersHorizontal size={17} /> Refine your stay
          </div>
          <div className="filter-group">
            <strong>Stay type</strong>
            {["All stays", "Suite", "Villa", "Room", "Studio", "Lodge"].map(
              (c) => (
                <button
                  key={c}
                  className={`filter-option ${category === c ? "selected" : ""}`}
                  onClick={() => setCategory(c)}
                >
                  <span>{c}</span>
                  <span className="filter-radio" />
                </button>
              ),
            )}
          </div>
          <div className="filter-group">
            <strong>Price per night</strong>
            <div className="price-range">
              <span>₹2,000</span>
              <b>₹{maxPrice.toLocaleString("en-IN")}</b>
            </div>
            <input
              type="range"
              min="3000"
              max="15000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>
          <div className="filter-tip">
            <SparklesIcon />
            Every stay is a sample listing for this demo experience.
          </div>
        </aside>
        <section className="results-content">
          <div className="results-heading">
            <div>
              <h2>
                {results.length} stays in {search.destination || "India"}
              </h2>
              <p className="muted">
                <MapPin size={14} /> Curated places for your next escape{" "}
                {nights > 0 && `· ${nights} nights`} · {search.guests} guests
              </p>
            </div>
            <label className="sort-select">
              <ArrowUpDown size={15} />
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="rating">Top rated</option>
              </select>
            </label>
          </div>
          {results.length ? (
            <div className="room-grid results-grid">
              {results.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                <MapPin />
              </div>
              <h3>No stays found just yet</h3>
              <p>
                Try another destination or loosen your filters to see more
                options.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setCategory("All stays");
                  setMaxPrice(15000);
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
function SparklesIcon() {
  return <span className="tip-spark">✦</span>;
}
