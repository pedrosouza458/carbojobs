import { FastifyInstance } from "fastify";
import { sql } from "../../../lib/db";

export async function GetBusinessDetails(app: FastifyInstance) {
  app.get("/business/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    const business = await sql/*sql*/ `
    SELECT * FROM business 
    WHERE id = ${id} 
    `;
    return reply.status(201).send( business );
  });
}
