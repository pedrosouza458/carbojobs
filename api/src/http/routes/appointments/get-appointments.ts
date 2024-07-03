import { FastifyInstance } from "fastify";
import { sql } from "../../../lib/db";
import { auth } from "../../middlewares/auth";

export async function GetAppointments(app: FastifyInstance) {
  app.register(auth).get("/appointments", async (request, reply) => {
    const userId = await request.getCurrentUserId()

    const appointments = await sql/*sql*/ `
    SELECT * FROM appointments 
    WHERE provider_id = ${userId}
    ORDER BY 
    CASE 
        WHEN status = 'Pendente' THEN 1
    END;
    `;

    return reply.status(201).send( appointments );
  });
}
