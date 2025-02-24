import { FastifyInstance } from "fastify";
import { sql } from "../../../lib/db";
// @ts-ignore
import { nanoid } from "nanoid";
import { hash } from "bcryptjs";
import { Cities } from "../../../enums/citites";
import { Services } from "../../../enums/services";

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  city: Cities;
  phone: string;
  avatar_url: string;
  description: string;
  service: Services;
}

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

    const user: CreateUserRequest & { id: string; indicated: number } = {
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

    Object.keys(user).forEach((key) => {
      if (user[key as keyof typeof user] == null) {
        delete user[key as keyof typeof user];
      }
    });
    
    try {
      await sql`INSERT INTO users ${sql(user)}`;
    } catch (error) {
      throw new Error("Erro inesperado, tente novamente em instantes");
    }

    return reply.status(201).send({
      message: "Conta criada com sucesso",
    });
  });
}
