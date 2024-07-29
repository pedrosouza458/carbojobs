import { FastifyInstance } from "fastify";
import { sql } from "../../../lib/db";
// @ts-ignore
import { nanoid } from "nanoid";
import { hash } from "bcryptjs";
import { auth } from "../../middlewares/auth";

export async function CreateLink(app: FastifyInstance) {
  app.post("/links", async (request, reply) => {
    const { sub } = await request.jwtVerify<{ sub: string }>();

    const userId = sub

    let { title, url }: any = request.body;
    const id = nanoid();

    const links: any = {
      id,
      title,
      url,
      provider_id: userId,
    };

    for (let prop in links) {
      if (links[prop] == null) {
        delete links[prop];
      }
    }

    const response = await sql`INSERT INTO links ${sql(links)}`;

    return reply.status(201).send({
      message: "Link criado com sucesso",
    });
  });
}
