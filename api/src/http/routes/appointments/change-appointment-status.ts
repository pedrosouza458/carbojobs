import { FastifyInstance } from "fastify";
import { sql } from "../../../lib/db";
require('dotenv').config();
const client = require("twilio")(process.env.TWILIO_ACCOUNT_SIDID, process.env.TWILIO_AUTH_TOKEN);

export async function ChangeAppointmentStatus(app: FastifyInstance) {
  app.get("/appointments/:id/:status", async (request, reply) => {
    // const { status }: any = request.body;
    const { id, status }: any = request.params;

    const appointments = await sql/*sql*/ `
    UPDATE appointments 
    SET status = ${status}
    WHERE id = ${id}
    `;

    const getPhone = await sql/*sql*/ `
    SELECT * FROM appointments 
    WHERE id = ${id}
    `;
    if (status === "Aceito") {
      await client.messages.create({
        body: `Agendamento Confirmado \nNúmero do cliente: ${getPhone[0].phone}`,
        from: "whatsapp:+14155238886",
        to: "whatsapp:+555197000856",
      });
    }

    if (status === "Rejeitado") {
      await client.messages.create({
        body: `Agendamento Rejeitado.`,
        from: "whatsapp:+14155238886",
        to: "whatsapp:+555197000856",
      });
    }

    return reply.status(201).send(appointments);
  });
}
