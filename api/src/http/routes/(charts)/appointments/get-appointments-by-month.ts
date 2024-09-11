import { FastifyInstance } from "fastify";
import { auth } from "../../../middlewares/auth";
import { sql } from "../../../../lib/db";

export async function GetAppointmentsByMonth(app: FastifyInstance) {
  app
    .register(auth)
    .get("/charts/appointments/months", async (request, reply) => {
      const userId = await request.getCurrentUserId();

      const appointments = await sql/*sql*/ `
      SELECT a.*, b.title
      FROM appointments a
      JOIN business b ON a.business_id = b.id
      WHERE a.provider_id = ${userId}
    `;
      const businessCounts = new Map<string, number | "">();

      // appointments.forEach((appointment) => {
      //   months.forEach((month) => {
      //     businessCounts.set(
      //       month,
      //       appointment.date.split("/")[1] === month
      //         ? (businessCounts.get(appointment.title) || 0) + 1
      //         : ""
      //     );
      //   });
      // });

      // Prepare the response to show each date once with its count
      const response = Array.from(businessCounts.entries()).map(
        ([month, appointments]) => ({
          month,
          appointments,
        })
      );

      return reply.status(201).send(response);
    });
}
