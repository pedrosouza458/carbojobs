import { FastifyInstance } from "fastify";
import { sql } from "../../../../lib/db";

export async function GetProviderById(app: FastifyInstance) {
  app.get("/providers/:id", async (request, reply) => {
    const { id }: any = request.params;

    const provider = await sql/*sql*/ `
    SELECT "id", "name", "avatar_url", "service", "city", "description" , "indicated", "phone"
    FROM users WHERE id = ${id} 
    `;
    return reply.status(201).send(provider);
  });
}
