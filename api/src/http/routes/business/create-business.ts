import { FastifyInstance } from "fastify";
import { sql } from "../../../lib/db";
// @ts-ignore
import { nanoid } from "nanoid";
import { hash } from "bcryptjs";
import { auth } from "../../middlewares/auth";

export async function CreateBusiness(app: FastifyInstance) {
  app.post("/business", async (request, reply) => {
    const { sub } = await request.jwtVerify<{ sub: string }>();

    const userId = sub

    let { title, description, price, bookingFee }: any = request.body;
    const id = nanoid();

    const business: any = {
      id,
      title,
      description,
      price,
      bookingFee,
      provider_id: userId,
    };

    for (let prop in business) {
      if (business[prop] == null) {
        delete business[prop];
      }
    }

    const response = await sql`INSERT INTO business ${sql(business)}`;

    return reply.status(201).send({
      message: "Trabalho criado com sucesso",
    });
  });
}
