import { useState } from "react";
import {
  UserRound,
  Mail,
  Phone,
  ShieldCheck,
  Bell,
  Save,
  Settings2,
} from "lucide-react";
import { useBooking } from "../context/BookingContext";

export default function Profile() {
  const { profile, setProfile, notify } = useBooking();
  const [form, setForm] = useState(profile);
  const [notifications, setNotifications] = useState({
    booking: true,
    offers: false,
    updates: true,
  });
  const save = (e) => {
    e.preventDefault();
    setProfile(form);
    notify("Profile settings saved successfully");
  };
  return (
    <div className="inner-page profile-page">
      <div className="section-kicker">YOUR ACCOUNT</div>
      <h1>
        A little more <em>about you.</em>
      </h1>
      <p className="muted">Keep your details up to date for a smoother stay.</p>
      <div className="profile-layout">
        <aside className="profile-card">
          <div className="profile-avatar-large">AM</div>
          <h2>{profile.name}</h2>
          <p>{profile.email}</p>
          <span className="member-label">
            <ShieldCheck size={14} /> Stayora member
          </span>
          <div className="profile-card-bottom">
            <span>ACCOUNT STATUS</span>
            <strong>
              <i /> Active
            </strong>
          </div>
        </aside>
        <div className="profile-settings">
          <form className="settings-panel" onSubmit={save}>
            <div className="settings-heading">
              <div className="settings-icon">
                <UserRound />
              </div>
              <div>
                <h2>Personal information</h2>
                <p>Your contact details and profile information.</p>
              </div>
            </div>
            <div className="form-grid">
              <label className="form-field full-field">
                Full name
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </label>
              <label className="form-field">
                Email address
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </label>
              <label className="form-field">
                Phone number
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </label>
            </div>
            <button className="btn btn-primary settings-save">
              <Save size={16} /> Save changes
            </button>
          </form>
          <div className="settings-panel">
            <div className="settings-heading">
              <div className="settings-icon">
                <Bell />
              </div>
              <div>
                <h2>Notifications</h2>
                <p>Choose what you'd like to hear from us.</p>
              </div>
            </div>
            {[
              {
                id: "booking",
                title: "Booking updates",
                desc: "Confirmation and reservation changes.",
              },
              {
                id: "offers",
                title: "Offers & inspiration",
                desc: "Occasional offers and destination ideas.",
              },
              {
                id: "updates",
                title: "Product updates",
                desc: "Important updates about your Stayora account.",
              },
            ].map((n) => (
              <label className="notification-row" key={n.id}>
                <div>
                  <strong>{n.title}</strong>
                  <small>{n.desc}</small>
                </div>
                <input
                  type="checkbox"
                  checked={notifications[n.id]}
                  onChange={(e) =>
                    setNotifications({
                      ...notifications,
                      [n.id]: e.target.checked,
                    })
                  }
                />
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
