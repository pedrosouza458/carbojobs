import { FastifyInstance } from "fastify";
import { sql } from "../../../lib/db";

export async function HideAppointments(app: FastifyInstance) {
  app.put("/appointments/:id", async (request, reply) => {
    const { id }: any = request.params;

    const appointments = await sql/*sql*/ `
    UPDATE appointments SET isHidden = 'True' WHERE id = ${id}
    `;

    return reply.status(201).send(appointments);
  });
}
