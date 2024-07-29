import { FastifyInstance } from "fastify";
import { auth } from "../../../middlewares/auth";
import { sql } from "../../../../lib/db";

export async function GetAppointmentsByDay(app: FastifyInstance) {
  app
    .register(auth)
    .get("/charts/appointments/days", async (request, reply) => {
      const userId = await request.getCurrentUserId();

      const appointments = await sql/*sql*/ `
        SELECT * FROM appointments 
        WHERE provider_id = ${userId}
      `;

      const increaseDay = (date: string): string => {
        const [year, month, day] = date.split("-");
        const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
        dateObj.setDate(dateObj.getDate() + 1);
        const newDay = String(dateObj.getDate()).padStart(2, "0");
        const newMonth = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are 0-based
        const newYear = dateObj.getFullYear();
        return `${newYear}-${newMonth}-${newDay}`;
      };

      const formatDate = (date: string): string => {
        const [day, month, year] = date.split("/");
        return `${year}-${month}-${day}`;
      };

      const dateCounts = new Map<string, number>();

      // Iterate over the appointments to count each date's occurrences
      appointments.forEach((appointment) => {
        const formattedDate = formatDate(appointment.date);
        const incrementedDate = increaseDay(formattedDate);

        dateCounts.set(
          incrementedDate,
          (dateCounts.get(incrementedDate) || 0) + 1
        );
      });

      // Prepare the response to show each date once with its count
      const response = Array.from(dateCounts.entries()).map(
        ([date, appointments]) => ({
          date,
          appointments,
        })
      );

      return reply.status(201).send(response);
    });
}
