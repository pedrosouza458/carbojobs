import { FastifyInstance } from "fastify";
import { auth } from "../../../middlewares/auth";
import { sql } from "../../../../lib/db";

export async function GetAppointmentsByService(app: FastifyInstance) {
  app
    .register(auth)
    .get("/charts/appointments/services", async (request, reply) => {
      const userId = await request.getCurrentUserId();

      const appointments = await sql/*sql*/ `
      SELECT a.*, b.title
      FROM appointments a
      JOIN business b ON a.business_id = b.id
      WHERE a.provider_id = ${userId} 
    `;
      const businessCounts = new Map<string, number>();

      appointments.forEach((appointment) => {
        businessCounts.set(
          appointment.title,
          (businessCounts.get(appointment.title) || 0) + 1
        );
      });

      // Prepare the response to show each date once with its count
      const response = Array.from(businessCounts.entries()).map(
        ([service, appointments], index) => ({
          service,
          appointments,
          fill: `hsl(var(--chart-${(index % 6) + 1}))`,
        })
      );

      return reply.status(201).send(response);
    });
}
