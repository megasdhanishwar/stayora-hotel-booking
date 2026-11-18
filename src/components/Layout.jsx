import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Compass,
  LayoutDashboard,
  CalendarCheck,
  UserRound,
  Hotel,
  MoonStar,
} from "lucide-react";
import Toast from "./Toast";

export default function Layout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const close = () => setOpen(false);
  const nav = [
    { to: "/", label: "Discover", icon: Compass, end: true },
    { to: "/my-bookings", label: "My bookings", icon: CalendarCheck },
    { to: "/profile", label: "Profile", icon: UserRound },
    { to: "/admin", label: "Admin", icon: LayoutDashboard },
  ];
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner">
          <Link to="/" className="brand" onClick={close}>
            <span className="brand-mark">
              <Hotel size={19} />
            </span>
            <span>
              stayora<span className="brand-period">.</span>
            </span>
          </Link>
          <nav className={`main-nav ${open ? "nav-open" : ""}`}>
            {nav.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={close}
                className="nav-link"
              >
                <Icon size={16} />
                {label}
              </NavLink>
            ))}
            <Link to="/admin" className="mobile-admin-link" onClick={close}>
              Manage property <span>↗</span>
            </Link>
          </nav>
          <div className="header-actions">
            <span className="header-status">
              <span className="status-dot" /> Your next stay awaits
            </span>
            <Link to="/profile" className="avatar">
              AM
            </Link>
            <button
              className="mobile-menu"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      <main key={location.pathname} className="page-transition">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="footer-inner">
          <Link to="/" className="brand">
            <span className="brand-mark">
              <Hotel size={17} />
            </span>
            <span>
              stayora<span className="brand-period">.</span>
            </span>
          </Link>
          <p>
            Find your place in the world. Thoughtful stays, beautifully booked.
          </p>
          <span>© 2026 Stayora. Sample booking experience.</span>
        </div>
      </footer>
      <Toast />
    </div>
  );
}
