import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { rooms } from "../data/rooms";

const BookingContext = createContext(null);
const read = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(() => read("stayora_bookings", []));
  const [customRooms, setCustomRooms] = useState(() =>
    read("stayora_rooms", rooms),
  );
  const [toast, setToast] = useState("");
  const [search, setSearch] = useState({
    destination: "Goa",
    checkIn: "",
    checkOut: "",
    guests: 2,
  });
  const [profile, setProfile] = useState(() =>
    read("stayora_profile", {
      name: "Karthik Kumar",
      email: "karthik.kumar@email.com",
      phone: "+91 98765 43210",
    }),
  );

  useEffect(
    () => localStorage.setItem("stayora_bookings", JSON.stringify(bookings)),
    [bookings],
  );
  useEffect(
    () => localStorage.setItem("stayora_rooms", JSON.stringify(customRooms)),
    [customRooms],
  );
  useEffect(
    () => localStorage.setItem("stayora_profile", JSON.stringify(profile)),
    [profile],
  );

  const notify = (message) => {
    setToast(message);
    window.clearTimeout(window.__stayoraToast);
    window.__stayoraToast = window.setTimeout(() => setToast(""), 2800);
  };
  const createBooking = (booking) => {
    const created = {
      ...booking,
      id: `ST-${Date.now().toString().slice(-7)}`,
      status: "Confirmed",
      createdAt: new Date().toISOString(),
    };
    setBookings((prev) => [created, ...prev]);
    return created;
  };
  const cancelBooking = (id) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "Cancelled" } : b)),
    );
    notify("Booking cancelled successfully");
  };
  const value = useMemo(
    () => ({
      bookings,
      setBookings,
      customRooms,
      setCustomRooms,
      toast,
      notify,
      search,
      setSearch,
      profile,
      setProfile,
      createBooking,
      cancelBooking,
    }),
    [bookings, customRooms, toast, search, profile],
  );
  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}
export const useBooking = () => useContext(BookingContext);
