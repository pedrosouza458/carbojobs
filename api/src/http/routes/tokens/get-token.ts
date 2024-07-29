import { FastifyInstance } from "fastify";
import { nanoid } from "nanoid";
import { sql } from "../../../lib/db";

export async function GetToken(app: FastifyInstance){
   app.get('/token', async (request, reply) => {
    const code = nanoid()

    await sql/*sql*/`
      INSERT INTO tokens (id, code)  VALUES
      (${nanoid()}, ${code})
    `;
    return reply.send({code})
   })
}