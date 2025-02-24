import { FastifyInstance } from "fastify";
import { sql } from "../../../lib/db";
import { setDefaultAutoSelectFamilyAttemptTimeout } from "net";
import { Cities } from "../../../enums/citites";
import { Services } from "../../../enums/services";

interface UpdateUserRequest {
  name: string;
  email: string;
  password: string;
  city: Cities;
  phone: string;
  avatar_url: string;
  description: string;
  service: Services;
  role: string;
  hours: string;
  days: string;
  [key: string]: string | Cities | Services;
}

export async function UpdateUser(app: FastifyInstance) {
  app.put<{ Params: { id: string } }>("/users/update/:id", async (request, reply) => {
    const { id } = request.params;
    const {
      name,
      email,
      password,
      role,
      phone,
      service,
      city,
      avatar_url,
      description,
      hours,
      days
    } = request.body as UpdateUserRequest;

    const user: Partial<UpdateUserRequest> = {
      name,
      email,
      password,
      role,
      city,
      phone,
      avatar_url,
      description,
      service,
      hours,
      days
    };

    for (let prop in user) {
      if ((user as any)[prop] == null) {
        delete (user as any)[prop];
      }
    }

    await sql/*sql*/`UPDATE users set ${sql(user)} WHERE id = ${id}`;

    return reply.status(201).send();
  });
}
