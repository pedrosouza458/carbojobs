import { FastifyInstance } from "fastify";
import { sql } from "../../../lib/db";
// @ts-ignore
import { nanoid } from "nanoid";
import { hash } from "bcryptjs";
const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SIDID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function CreateUser(app: FastifyInstance) {
  app.post("/users", async (request, reply) => {
    let {
      name,
      email,
      password,
      city,
      phone,
      avatar_url,
      description,
      service,
    }: any = request.body;

    password = await hash(password, 6);
    const id = nanoid();

    const user: any = {
      id,
      name,
      email,
      password,
      city,
      phone,
      avatar_url,
      description,
      service,
      indicated: 0,
    };

    for (let prop in user) {
      if (user[prop] == null) {
        delete user[prop];
      }
    }

    try {
      await sql`INSERT INTO users ${sql(user)}`;
    } catch (error) {
      throw new Error('Erro inesperado, tente novamente em instantes')
    }

    return reply.status(201).send({
      message: "Conta criada com sucesso",
    });
  });
}
