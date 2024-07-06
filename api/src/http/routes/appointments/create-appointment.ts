import { FastifyInstance } from "fastify";
import { sql } from "../../../lib/db";
// @ts-ignore
import { nanoid } from "nanoid";
import { hash } from "bcryptjs";
import { auth } from "../../middlewares/auth";
const client = require("twilio")(process.env.TWILIO_ACCOUNT_SIDID, process.env.TWILIO_AUTH_TOKEN);

export async function CreateAppointment(app: FastifyInstance) {
  app.register(auth).post("/appointments", async (request, reply) => {
    const { sub } = await request.jwtVerify<{ sub: string }>();

    const userId = sub;
    let { business_id, date, hour, name, phone, provider_id, description, client_id }: any =
      request.body;

    const appointment: any = {
      id: nanoid(),
      business_id,
      date,
      hour,
      description,
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

    const service = await sql/*sql*/ `  SELECT "title" FROM business 
    WHERE id = ${business_id}`;

    const messageBody = `*Agendamento* \n \n${description ? description : 'Sem descrição.'} \n \n*Nome:* ${name} \n*Serviço*: ${service[0].title} \n*Dia:* ${date} \n*Hora:* ${hour}`;

    await client.messages.create({
      body: messageBody,
      from: "whatsapp:+14155238886",
      to: "whatsapp:+555197000856",
    });
    await sql`INSERT INTO appointments ${sql(appointment)}`;
    return reply.status(201).send({
      message: "Trabalho criado com sucesso",
    });
  });
}
