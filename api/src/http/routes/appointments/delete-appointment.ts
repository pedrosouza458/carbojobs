import { FastifyInstance } from "fastify";
import { sql } from "../../../lib/db";
import { auth } from "../../middlewares/auth";

export async function DeleteAppointments(app: FastifyInstance) {
  app.delete("/appointments/:id", async (request, reply) => {
    const { id }: any = request.params;

    const appointments = await sql/*sql*/ `
    DELETE FROM appointments WHERE id = ${id}
    `;

    return reply.status(201).send(appointments);
  });
}
