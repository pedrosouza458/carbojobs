import { FastifyInstance } from "fastify";
import { sql } from "../../../lib/db";

export async function UpdateBusiness(app: FastifyInstance) {
  app.put("/business/update/:id", async (request, reply) => {
    const { id }: any = request.params;
    const { title, description, price }: any = request.body;

    const appointment: any = {
      title,
      description,
      price,
    };

    for (let prop in appointment) {
      if (appointment[prop] == null) {
        delete appointment[prop];
      }
    }

    await sql/*sql*/ `UPDATE appointments set ${sql(
      appointment
    )} WHERE id = ${id}`;

    return reply.status(201).send();
  });
}
