import { FastifyInstance } from "fastify";
import { sql } from "../../../lib/db";

import { nanoid } from "nanoid";

export async function CreateAppointment(app: FastifyInstance) {
  app
    .post("/appointments/:business_id", async (request, reply) => {

      const { business_id }: any = request.params;

      const getProvider = await sql/*sql*/ `
      SELECT u.*
      FROM users u
      JOIN business b ON u.id = b.provider_id
      WHERE b.id = ${business_id};`;
      console.log(getProvider)

      let { date, hour, name, description }: any =
        request.body;

      const id = nanoid();
      const appointment: any = {
        id,
        business_id,
        date,
        hour,
        description,
        name,
        provider_id: await getProvider[0].id,
      };

      for (let prop in appointment) {
        if (appointment[prop] == null) {
          delete appointment[prop];
        }
      }

      const service = await sql/*sql*/ `  SELECT "title" FROM business 
      WHERE id = ${business_id}`;

      const messageBody = `*Agendamento* \n \n${
        description ? `Descrição: ${description}` : "Sem descrição."
      }\n \n*Id*: ${id} \n*Nome:* ${name} \n*Serviço*: ${
        service[0].title
      } \n*Dia:* ${date} \n*Hora:* ${hour}`;

      await sql`INSERT INTO appointments ${sql(appointment)}`;
      return reply.status(201).send({
        message: "Agendamento criado com sucesso",
      });
    });
    
}
