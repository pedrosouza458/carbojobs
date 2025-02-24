import { FastifyInstance } from "fastify";
import { sql } from "../../../lib/db";
// @ts-ignore
import { nanoid } from "nanoid";

interface CreateLinkRequest {
  id: string;
  title: string;
  url: string;
  provider_id: string;
}

export async function CreateLink(app: FastifyInstance) {
  app.post("/links", async (request, reply) => {
    const { sub } = await request.jwtVerify<{ sub: string }>();

    const userId = sub

    let { title, url } = request.body as CreateLinkRequest;
    const id = nanoid();

    const links: CreateLinkRequest = {
      id,
      title,
      url,
      provider_id: userId,
    };

    for (let prop in links) {
      if ((links as any)[prop] == null) {
        delete (links as any)[prop];
      }
    }

    const response = await sql`INSERT INTO links ${sql(links)}`;

    return reply.status(201).send({
      message: "Link criado com sucesso",
    });
  });
}
