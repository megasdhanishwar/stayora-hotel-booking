import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDownRight,
  ArrowUpRight,
  BedDouble,
  CalendarCheck,
  CircleDollarSign,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Check,
  Users,
} from "lucide-react";
import { useBooking } from "../context/BookingContext";

const emptyRoom = {
  name: "",
  type: "Premium room",
  city: "Chennai",
  country: "India",
  location: "",
  price: "",
  rating: 4.8,
  reviews: 0,
  guests: 2,
  beds: "1 King bed",
  size: "42 m²",
  tag: "New listing",
  category: "Room",
  image:
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=85",
  gallery: [],
  description: "A comfortable, thoughtfully designed stay.",
  amenities: ["Wi-Fi", "Air conditioning", "Queen bed"],
};
export default function Admin() {
  const { bookings, customRooms, setCustomRooms, notify } = useBooking();
  const [tab, setTab] = useState("overview");
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyRoom);
  const [modal, setModal] = useState(false);
  const revenue = bookings
    .filter((b) => b.status === "Confirmed")
    .reduce((s, b) => s + b.total, 0);
  const filtered = useMemo(
    () =>
      customRooms.filter(
        (r) =>
          r.name.toLowerCase().includes(query.toLowerCase()) ||
          r.city.toLowerCase().includes(query.toLowerCase()),
      ),
    [customRooms, query],
  );
  const openAdd = () => {
    setEditing(null);
    setForm(emptyRoom);
    setModal(true);
  };
  const openEdit = (room) => {
    setEditing(room.id);
    setForm({ ...room });
    setModal(true);
  };
  const save = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.location.trim() || Number(form.price) <= 0) {
      notify("Complete the room name, location and price");
      return;
    }
    if (editing) {
      setCustomRooms((prev) =>
        prev.map((r) =>
          r.id === editing
            ? {
                ...form,
                id: editing,
                price: Number(form.price),
                guests: Number(form.guests),
              }
            : r,
        ),
      );
      notify("Room details updated");
    } else {
      setCustomRooms((prev) => [
        {
          ...form,
          id: Date.now(),
          price: Number(form.price),
          guests: Number(form.guests),
          image: form.image || emptyRoom.image,
        },
        ...prev,
      ]);
      notify("New room added");
    }
    setModal(false);
  };
  const remove = (id) => {
    if (window.confirm("Delete this room listing?")) {
      setCustomRooms((prev) => prev.filter((r) => r.id !== id));
      notify("Room listing deleted");
    }
  };
  return (
    <div className="admin-page">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="brand-mark">
            <BedDouble size={18} />
          </span>
          <div>
            <strong>
              stayora<span>.</span>
            </strong>
            <small>PROPERTY CONSOLE</small>
          </div>
        </div>
        <div className="admin-side-label">WORKSPACE</div>
        {[
          { id: "overview", label: "Overview", icon: CalendarCheck },
          { id: "rooms", label: "Rooms & pricing", icon: BedDouble },
          { id: "bookings", label: "Bookings", icon: Users },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`admin-nav ${tab === id ? "active" : ""}`}
          >
            <Icon size={17} />
            {label}
            {id === "bookings" && bookings.length > 0 && (
              <span>{bookings.length}</span>
            )}
          </button>
        ))}
        <div className="admin-sidebar-bottom">
          <div className="admin-online">
            <span /> All systems operational
          </div>
          <p>Stayora Admin · v1.0</p>
        </div>
      </aside>
      <section className="admin-main">
        <header className="admin-topbar">
          <div>
            <span className="admin-breadcrumb">Workspace / </span>
            <strong>
              {tab === "overview"
                ? "Overview"
                : tab === "rooms"
                  ? "Rooms & pricing"
                  : "Bookings"}
            </strong>
          </div>
          <Link to="/" className="admin-view-site">
            View website <ArrowUpRight size={15} />
          </Link>
        </header>
        <div className="admin-content">
          {tab === "overview" ? (
            <>
              <div className="admin-welcome">
                <div>
                  <div className="section-kicker">
                    WEDNESDAY, 18 NOVEMBER 2026
                  </div>
                  <h1>
                    Welcome, <em>Admin.</em>
                  </h1>
                  <p>Here's what's happening with your property today.</p>
                </div>
                <button className="btn btn-primary" onClick={openAdd}>
                  <Plus size={17} /> Add a room
                </button>
              </div>
              <div className="admin-stats">
                <Stat
                  icon={BedDouble}
                  label="Total rooms"
                  value={customRooms.length}
                  note="Active listings"
                />
                <Stat
                  icon={CalendarCheck}
                  label="Total bookings"
                  value={bookings.length}
                  note={`${bookings.filter((b) => b.status === "Confirmed").length} confirmed`}
                />
                <Stat
                  icon={CircleDollarSign}
                  label="Booking revenue"
                  value={`₹${revenue.toLocaleString("en-IN")}`}
                  note="Confirmed bookings"
                />
                <Stat
                  icon={Users}
                  label="Guests hosted"
                  value={bookings
                    .filter((b) => b.status === "Confirmed")
                    .reduce((s, b) => s + b.guests, 0)}
                  note="Across all bookings"
                />
              </div>
              <div className="admin-panels">
                <div className="admin-panel">
                  <div className="panel-heading">
                    <div>
                      <h3>Recent bookings</h3>
                      <p>Latest guest reservations</p>
                    </div>
                    <button
                      className="subtle-link"
                      onClick={() => setTab("bookings")}
                    >
                      View all <ArrowUpRight size={14} />
                    </button>
                  </div>
                  {bookings.slice(0, 5).length ? (
                    bookings.slice(0, 5).map((b) => (
                      <div className="recent-booking" key={b.id}>
                        <div className="recent-avatar">
                          {b.guest.name
                            .split(" ")
                            .map((x) => x[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                        <div className="recent-booking-info">
                          <strong>{b.guest.name}</strong>
                          <small>
                            {b.roomName} · {b.checkIn}
                          </small>
                        </div>
                        <strong className="recent-price">
                          ₹{b.total.toLocaleString("en-IN")}
                        </strong>
                        <span
                          className={`status-pill ${b.status === "Confirmed" ? "confirmed" : "cancelled"}`}
                        >
                          {b.status}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="admin-empty">
                      No bookings yet. Reservations will appear here.
                    </div>
                  )}
                </div>
                <div className="admin-panel quick-panel">
                  <div className="panel-heading">
                    <div>
                      <h3>Quick overview</h3>
                      <p>Your listing snapshot</p>
                    </div>
                  </div>
                  <div className="quick-row">
                    <span>Rooms listed</span>
                    <strong>{customRooms.length}</strong>
                  </div>
                  <div className="quick-row">
                    <span>Average nightly rate</span>
                    <strong>
                      ₹
                      {customRooms.length
                        ? Math.round(
                            customRooms.reduce(
                              (s, r) => s + Number(r.price),
                              0,
                            ) / customRooms.length,
                          ).toLocaleString("en-IN")
                        : 0}
                    </strong>
                  </div>
                  <div className="quick-row">
                    <span>Confirmed reservations</span>
                    <strong>
                      {bookings.filter((b) => b.status === "Confirmed").length}
                    </strong>
                  </div>
                  <div className="quick-tip">
                    ✦{" "}
                    <span>
                      Keep your room details and pricing up to date to help
                      guests find the right stay.
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : null}
          {tab === "rooms" ? (
            <>
              <div className="admin-welcome">
                <div>
                  <div className="section-kicker">YOUR PROPERTY INVENTORY</div>
                  <h1>
                    Rooms & <em>pricing.</em>
                  </h1>
                  <p>Manage your stay catalogue and nightly rates.</p>
                </div>
                <button className="btn btn-primary" onClick={openAdd}>
                  <Plus size={17} /> Add a room
                </button>
              </div>
              <div className="admin-table-panel">
                <div className="table-toolbar">
                  <div>
                    <h3>All room listings</h3>
                    <p>{customRooms.length} properties in your catalogue</p>
                  </div>
                  <label className="table-search">
                    <Search size={16} />
                    <input
                      placeholder="Search rooms..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </label>
                </div>
                <div className="table-scroll">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>ROOM</th>
                        <th>LOCATION</th>
                        <th>CAPACITY</th>
                        <th>PRICE / NIGHT</th>
                        <th>RATING</th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((r) => (
                        <tr key={r.id}>
                          <td>
                            <div className="table-room">
                              <img src={r.image} alt="" />
                              <div>
                                <strong>{r.name}</strong>
                                <small>{r.type}</small>
                              </div>
                            </div>
                          </td>
                          <td>{r.city}</td>
                          <td>{r.guests} guests</td>
                          <td>
                            <strong>
                              ₹{Number(r.price).toLocaleString("en-IN")}
                            </strong>
                          </td>
                          <td>★ {r.rating}</td>
                          <td>
                            <div className="table-actions">
                              <button
                                onClick={() => openEdit(r)}
                                aria-label="Edit room"
                              >
                                <Pencil size={15} />
                              </button>
                              <button
                                onClick={() => remove(r.id)}
                                aria-label="Delete room"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filtered.length === 0 && (
                    <div className="admin-empty">
                      No rooms match your search.
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : null}
          {tab === "bookings" ? (
            <>
              <div className="admin-welcome">
                <div>
                  <div className="section-kicker">GUEST RESERVATIONS</div>
                  <h1>
                    Booking <em>management.</em>
                  </h1>
                  <p>Review guest details and reservation status.</p>
                </div>
              </div>
              <div className="admin-table-panel">
                <div className="table-toolbar">
                  <div>
                    <h3>All bookings</h3>
                    <p>{bookings.length} reservations recorded</p>
                  </div>
                </div>
                <div className="table-scroll">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>REFERENCE</th>
                        <th>GUEST</th>
                        <th>ROOM</th>
                        <th>DATES</th>
                        <th>TOTAL</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((b) => (
                        <tr key={b.id}>
                          <td>
                            <strong>{b.id}</strong>
                          </td>
                          <td>
                            <div>
                              <strong>{b.guest.name}</strong>
                              <small className="table-sub">
                                {b.guest.email}
                              </small>
                            </div>
                          </td>
                          <td>{b.roomName}</td>
                          <td>
                            {b.checkIn}
                            <small className="table-sub">to {b.checkOut}</small>
                          </td>
                          <td>
                            <strong>₹{b.total.toLocaleString("en-IN")}</strong>
                          </td>
                          <td>
                            <span
                              className={`status-pill ${b.status === "Confirmed" ? "confirmed" : "cancelled"}`}
                            >
                              {b.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {!bookings.length && (
                    <div className="admin-empty">
                      No bookings yet. New reservations will show up here.
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </section>
      {modal && (
        <div
          className="modal-backdrop"
          onMouseDown={(e) => e.target === e.currentTarget && setModal(false)}
        >
          <form className="room-modal" onSubmit={save}>
            <div className="modal-heading">
              <div>
                <span className="section-kicker">PROPERTY INVENTORY</span>
                <h2>{editing ? "Edit room" : "Add a room"}</h2>
              </div>
              <button
                type="button"
                className="modal-close"
                onClick={() => setModal(false)}
              >
                <X />
              </button>
            </div>
            <div className="modal-form-grid">
              <label className="form-field full-field">
                Room name
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. The Azure Suite"
                />
              </label>
              <label className="form-field">
                Room type
                <select
                  value={form.type}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      type: e.target.value,
                      category: e.target.value.includes("Villa")
                        ? "Villa"
                        : "Room",
                    })
                  }
                >
                  <option>Premium room</option>
                  <option>Luxury suite</option>
                  <option>Garden villa</option>
                  <option>Private villa</option>
                  <option>Design studio</option>
                  <option>Mountain lodge</option>
                </select>
              </label>
              <label className="form-field">
                City
                <input
                  required
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                />
              </label>
              <label className="form-field full-field">
                Location
                <input
                  required
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  placeholder="Neighbourhood, city"
                />
              </label>
              <label className="form-field">
                Price per night (₹)
                <input
                  type="number"
                  min="1"
                  required
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
              </label>
              <label className="form-field">
                Guest capacity
                <input
                  type="number"
                  min="1"
                  max="10"
                  required
                  value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: e.target.value })}
                />
              </label>
              <label className="form-field full-field">
                Image URL
                <input
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://..."
                />
              </label>
            </div>
            <div className="modal-actions">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" type="submit">
                <Check size={16} />
                {editing ? "Save changes" : "Create listing"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
function Stat({ icon: Icon, label, value, note }) {
  return (
    <div className="admin-stat">
      <span className="stat-icon">
        <Icon size={19} />
      </span>
      <span className="stat-label">{label}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </div>
  );
}
