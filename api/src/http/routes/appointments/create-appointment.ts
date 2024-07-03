import { FastifyInstance } from "fastify";
import { sql } from "../../../lib/db";
// @ts-ignore
import { nanoid } from "nanoid";
import { hash } from "bcryptjs";
import { auth } from "../../middlewares/auth";

export async function CreateAppointment(app: FastifyInstance) {
  app.register(auth).post("/appointments", async (request, reply) => {
    const { sub } = await request.jwtVerify<{ sub: string }>();

    const userId = sub
    let { business_id, date, hour, name, phone, provider_id, client_id }: any =
      request.body;

    const appointment: any = {
      id: nanoid(),
      business_id,
      date,
      hour,
      name,
      phone,
      provider_id,
      client_id: userId,
    };
    for (let prop in appointment) {
      if (appointment[prop] == null) {
        delete appointment[prop];
      }
    }
    const response = await sql`INSERT INTO appointments ${sql(appointment)}`;
    return reply.status(201).send({
      message: "Trabalho criada com sucesso",
    });
  });
}
