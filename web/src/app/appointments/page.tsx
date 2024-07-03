import { AppointmentList } from "@/components/appointments-list";
import Schedule from "./schedule";

export default function Appointments() {
  return (
    <Schedule>
      <AppointmentList />
    </Schedule>
  );
}
