import { FastifyInstance } from "fastify";
import { auth } from "../../middlewares/auth";
import { sql } from "../../../lib/db";

export async function GetProfile(app: FastifyInstance) {
  app.register(auth).get("/users/profile", async (request, reply) => {
    const userId = await request.getCurrentUserId();

    const user = await sql/*sql*/ `
     SELECT * FROM users WHERE id = ${userId}
    `;

    return reply.status(201).send(user);
  });
}
