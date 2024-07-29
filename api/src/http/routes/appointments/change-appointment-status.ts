import { FastifyInstance } from "fastify";
import { sql } from "../../../lib/db";
import { auth } from "../../middlewares/auth";

require("dotenv").config();

export async function ChangeAppointmentStatus(app: FastifyInstance) {
  app
    .register(auth)
    .get("/appointments/:id/:status", async (request, reply) => {
      // const { status }: any = request.body;
      const { id, status }: any = request.params;
      const { sub } = await request.jwtVerify<{ sub: string }>();

      const user = await sql/*sql*/ `
    SELECT "phone" FROM users WHERE id = ${sub}
    `;
      console.log(user);

      const getPhone = await sql/*sql*/ `
    SELECT * FROM appointments 
    WHERE id = ${id}
    `;
      console.log(getPhone);

      const redirectUrl = `https://carbojobs.com/appointments/${status}`;

      const update = await sql/*sql*/ `
      UPDATE appointments set status = ${status} WHERE id = ${id}
      `;

      return reply.redirect(redirectUrl);
    });
}
