import { FastifyInstance } from "fastify";
import { auth } from "../../middlewares/auth";
import { sql } from "../../../lib/db";

export async function DeleteUser(app: FastifyInstance) {
  app.register(auth).delete("/users/delete", async (request, reply) => {
    const userId = await request.getCurrentUserId();

    const user = await sql/*sql*/ `
     DELETE FROM users WHERE id = ${userId} 
    `;

    return reply.status(201).send('Usuário deletado');
  });
}
