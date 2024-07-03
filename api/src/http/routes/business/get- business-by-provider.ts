import { FastifyInstance } from "fastify";
import { sql } from "../../../lib/db";

export async function GetBusinessByProvider(app: FastifyInstance) {
  app.get("/business/providers/:providerId", async (request, reply) => {
    const { providerId }: any = request.params;

    const business = await sql/*sql*/`
    SELECT b.*, u.hours, u.days, u.id AS provider_id
    FROM business b
    JOIN users u ON b.provider_id = u.id
    WHERE u.id = ${providerId}
    `;
    return reply.status(201).send(business);
  });
}
