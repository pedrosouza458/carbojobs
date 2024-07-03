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
    const { email, password }: any = request.body;

    const userFromEmail: UserFromEmailProps[] = await sql/*sql*/ `
      SELECT "id", "password", "email" FROM users WHERE email = ${email}
    `;

    if (userFromEmail.length === 0) {
      // Return a 401 Unauthorized error if no user is found
      return reply.status(401).send({ error: "Invalid credentials." });
    }

    const hashedPassword = userFromEmail[0].password;

    const isPasswordValid = await compare(password, hashedPassword);

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
