import { FastifyInstance } from "fastify";
import { sql } from "../../../lib/db";
import { hash } from "bcryptjs";

export async function ForgotPassword(app: FastifyInstance) {
  app.put("/forgot-password", async (request, reply) => {
    const { code, password, phone, email }: any = request.body;

    const checkCode = await sql/*sql*/ `
    SELECT * FROM tokens WHERE code = ${code}
    `;
    const hashedPassword = await hash(password, 6);
    if (checkCode) {
      await sql/*sql*/ `
      UPDATE users SET password = ${hashedPassword} WHERE phone = ${phone} AND email = ${email}
      `;
      await sql/*sql*/ `
      DELETE FROM tokens WHERE code = ${code}
      `;
      return reply.send({
        message: "Senha atualizada",
      });
    }
  });
}
