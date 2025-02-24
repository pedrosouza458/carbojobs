import { FastifyInstance } from "fastify";
import { sql } from "../../../lib/db";

export async function GetLinksByProvider(app: FastifyInstance) {
  app.get("/links/providers/:providerId", async (request, reply) => {
    const { providerId } = request.params as { providerId: string };;

    const business = await sql/*sql*/ `
    SELECT * FROM links 
    WHERE provider_id = ${providerId}
    `;
    return reply.status(201).send( business );
  });
}
