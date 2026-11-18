import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Compass,
  Gem,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import RoomCard from "../components/RoomCard";
import { useBooking } from "../context/BookingContext";

export default function Home() {
  const { customRooms } = useBooking();
  return (
    <>
      <section className="hero">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="hero-kicker">
              <span className="kicker-line" /> THE ART OF GETTING AWAY{" "}
              <Sparkles size={14} />
            </div>
            <h1>
              Somewhere
              <br />
              you'll <em>love</em> to be.
            </h1>
            <p>
              Discover considered spaces, memorable places and stays that make
              the journey feel just as special.
            </p>
            <div className="hero-proof">
              <span>
                <BadgeCheck size={16} /> Handpicked stays
              </span>
              <span>
                <ShieldCheck size={16} /> Easy, secure booking
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <img
              className="hero-photo"
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1500&q=90"
              alt="Beautiful modern resort villa"
            />
            <div className="hero-photo-overlay" />
            <div className="floating-note">
              <span className="note-icon">
                <Gem size={17} />
              </span>
              <div>
                <strong>Stay a little differently</strong>
                <small>Spaces worth travelling for</small>
              </div>
            </div>
            <div className="hero-image-caption">
              <span>01 / 06</span>
              <span>THE QUIET COLLECTION</span>
            </div>
          </div>
        </div>
        <div className="hero-search">
          <SearchBar />
        </div>
        <div className="hero-bottom-line">
          <span>MADE FOR THE MOMENTS IN BETWEEN</span>
          <span>SCROLL TO EXPLORE ↓</span>
        </div>
      </section>

      <section className="section-wrap collection-section">
        <div className="section-heading">
          <div>
            <div className="section-kicker">A PLACE FOR EVERY PACE</div>
            <h2>
              Stays worth <em>staying for.</em>
            </h2>
            <p>From slow mornings in the hills to design-led city escapes.</p>
          </div>
          <Link to="/search" className="text-link">
            Explore all stays <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="room-grid">
          {customRooms.slice(0, 3).map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>

      <section className="dark-feature">
        <div className="feature-image">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85"
            alt="Warm and peaceful hotel interior"
          />
        </div>
        <div className="feature-content">
          <div className="section-kicker light-kicker">
            THE STAYORA DIFFERENCE
          </div>
          <h2>
            More than a room.
            <br />
            <em>A feeling.</em>
          </h2>
          <p>
            We believe the right place can turn a trip into a story. That's why
            every stay is chosen for its character, comfort and little details.
          </p>
          <div className="feature-stats">
            <div>
              <strong>01</strong>
              <span>Thoughtful spaces</span>
            </div>
            <div>
              <strong>02</strong>
              <span>Transparent pricing</span>
            </div>
            <div>
              <strong>03</strong>
              <span>Simple booking</span>
            </div>
          </div>
          <Link to="/search" className="btn btn-light">
            Find your stay <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <section className="section-wrap bottom-cta">
        <div>
          <div className="section-kicker">YOUR NEXT CHAPTER STARTS HERE</div>
          <h2>
            Go where you feel
            <br />
            <em>most alive.</em>
          </h2>
        </div>
        <Link to="/search" className="btn btn-primary">
          Explore destinations <ArrowRight size={17} />
        </Link>
      </section>
    </>
  );
}
