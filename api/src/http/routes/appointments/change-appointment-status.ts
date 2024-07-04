import { FastifyInstance } from "fastify";
import { sql } from "../../../lib/db";

export async function ChangeAppointmentStatus(app: FastifyInstance) {
  app.get("/appointments/:id/:status", async (request, reply) => {
    // const { status }: any = request.body;
    const { id, status }: any = request.params;

    const appointments = await sql/*sql*/ `
    UPDATE appointments 
    SET status = ${status}
    WHERE id = ${id}
    `;

    reply.redirect(`https://carbojobs.vercel.app/appointments/${status}`)

    return reply.status(201).send(appointments);
  });
}
