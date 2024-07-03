import { FastifyInstance } from "fastify";
import { sql } from "../../../lib/db";
import { setDefaultAutoSelectFamilyAttemptTimeout } from "net";

export async function UpdateUser(app: FastifyInstance) {
  app.put("/users/update/:id", async (request, reply) => {
    const { id }: any = request.params;
    const {
      name,
      email,
      password,
      role,
      city,
      avatar_url,
      description,
      service,
      hours,
      days
    }: any = request.body;

    const user: any = {
      name,
      email,
      password,
      role,
      city,
      avatar_url,
      description,
      service,
      hours,
      days
    };

    for (let prop in user) {
      if (user[prop] == null) {
        delete user[prop];
      }
    }

    await sql/*sql*/`UPDATE users set ${sql(user)} WHERE id = ${id}`;

    return reply.status(201).send();
  });
}
