import { FastifyInstance } from "fastify";
import { sql } from "../../../lib/db";
import { compare } from "bcryptjs";

interface UserFromEmailProps {
  id: string;
  name: string;
  email: string;
  password: string;
}

export async function LoginUser(app: FastifyInstance) {
  app.post("/users/login", async (request, reply) => {
    const { email, password } = request.body as Partial<UserFromEmailProps>;

    if (!email) {
      return reply.status(400).send({ error: "Email is required." });
    }

    const userFromEmail = await sql<UserFromEmailProps[]>/*sql*/ `
      SELECT "id", "password", "email" FROM users WHERE email = ${sql(email)}
    `;

    if (userFromEmail.length === 0) {
      // Return a 401 Unauthorized error if no user is found
      return reply.status(401).send({ error: "Invalid credentials." });
    }

    const hashedPassword = userFromEmail[0].password;

    const isPasswordValid = password ? await compare(password, hashedPassword) : false;

    if (!isPasswordValid) {
      // Return a 401 Unauthorized error if the password is invalid
      return reply
        .status(401)
        .send({ error: "Email ou senha errada, tente novamente" });
    }

    const token = await reply.jwtSign(
      {
        sub: userFromEmail[0].id,
      },
      {
        sign: {
          expiresIn: "7d",
        },
      }
    );

    return reply.send({token})
  });
}
