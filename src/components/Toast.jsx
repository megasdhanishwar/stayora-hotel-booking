import { CheckCircle2 } from "lucide-react";
import { useBooking } from "../context/BookingContext";

export default function Toast() {
  const { toast } = useBooking();
  if (!toast) return null;
  return (
    <div className="toast">
      <CheckCircle2 size={18} />
      {toast}
    </div>
  );
}
