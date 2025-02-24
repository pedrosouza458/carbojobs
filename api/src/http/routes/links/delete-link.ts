import { FastifyInstance } from "fastify";
import { sql } from "../../../lib/db";
import { auth } from "../../middlewares/auth";

export async function DeleteLink(app: FastifyInstance) {
  app.delete("/link/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    const link = await sql`
    DELETE FROM links WHERE id = ${id}
    `;

    return reply.status(201).send(link);
  });
}
