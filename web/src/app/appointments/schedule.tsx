"use client";

import { Calendar } from "@/components/ui/calendar";
import { getAppointments } from "@/http/get-appointments";
import { getProfile } from "@/http/get-profile";
import { addDays } from "date-fns";
import React, { ReactNode, useEffect, useState } from "react";
interface ScheduleProps {
  children: ReactNode;
}

export default function Schedule({ children }: ScheduleProps) {
  // const initiallySelectedDates = [new Date(), addDays(new Date(), 1)];
  // const [appointmentsDates, setAppointmentsDates] = useState<Date[]>([]);
  // const [date, setDate] = React.useState<Date | undefined>(new Date());
  // useEffect(() => {
  //   // declare the data fetching function
  //   const fetchData = async () => {
  //     const user = await getProfile();

  //     const appointments = await getAppointments(user.map((user) => user.id));


  //     const parseDate = (dateString: string): Date => {
  //       const [day, month, year] = dateString.split("/");
  //       return new Date(`${year}-${month}-${day}`);
  //     };

  //     const dates = appointments
  //       .map((appointment) => {
  //         const date = parseDate(appointment.date);
  //         if (!isNaN(date.getTime())) {
  //           return date;
  //         } else {
  //           console.error(`Invalid date: ${appointment.date}`);
  //           return null;
  //         }
  //       })
  //       .filter((date): date is Date => date !== null);

  //     setAppointmentsDates(dates);

      
  //   };

  //   // call the function
  //   fetchData()
  //     // make sure to catch any error
  //     .catch(console.error);
  // }, []);
  return (
    <div className="md:mx-28 md:my-4">
      {/* {appointmentsDates.toString()} */}
      {/* {appointmentDates.toString()} */}
      {/* <p>data do calendario</p>
      {date?.toString()} */}
      {children}
      {/* <Calendar
        mode="single"
        selected={[appointmentsDates]}
      /> */}
    </div>
  );
}
