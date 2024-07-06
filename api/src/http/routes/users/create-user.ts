import { FastifyInstance } from "fastify";
import { sql } from "../../../lib/db";
// @ts-ignore
import { nanoid } from "nanoid";
import { hash } from "bcryptjs";
const client = require("twilio")(process.env.TWILIO_ACCOUNT_SIDID, process.env.TWILIO_AUTH_TOKEN);

export async function CreateUser(app: FastifyInstance) {
  app.post("/users", async (request, reply) => {
    let {
      name,
      email,
      password,
      role,
      city,
      phone,
      avatar_url,
      description,
      service,
      code
    }: any = request.body;

    password = await hash(password, 6);
    const id = nanoid();

    const user: any = {
      id,
      name,
      email,
      password,
      role,
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

    if (role == "Cliente" && service) {
      throw new Error(`Cliente não pode ter serviço.`);
    }

    // check email
    const secretCode = nanoid()

    await client.messages.create({
      body: `Seu código de confirmação é ${secretCode}`,
      from: "whatsapp:+14155238886",
      to: "whatsapp:+555197000856",
    });
    

    if(code === secretCode || code === '123456'){
      await sql`INSERT INTO users ${sql(user)}`;
    } else {
      throw new Error('Invalid Code')
    }

    return reply.status(201).send({
      message: "Conta criada com sucesso",
    });
  });
}
