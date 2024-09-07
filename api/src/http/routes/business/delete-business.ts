import { FastifyInstance } from "fastify";
import { sql } from "../../../lib/db";

export async function DeleteBusiness(app: FastifyInstance) {
  app.delete("/business/:id", async (request, reply) => {
    const { id }: any = request.params;

    const business = await sql/*sql*/ `
    DELETE FROM business WHERE id = ${id}
    `;

    return reply.status(201).send(business);
  });
}
