import { FastifyInstance } from "fastify";
import { auth } from "../../middlewares/auth";
import { sql } from "../../../lib/db";
import { nanoid } from "nanoid";

export async function IndicateProvider(app: FastifyInstance) {
  app.register(auth).post("/indicate/:providerId", async (request, reply) => {
    const userId = await request.getCurrentUserId();
    const id = nanoid();
    const { providerId }: any = request.params;

    // Check if the indication already exists
    const checkIndication = await sql/*sql*/ `
    SELECT * FROM indications WHERE provider_id = ${providerId} AND client_id = ${userId}
    `;

    // If the indication already exists, throw an error
    if (Array.isArray(checkIndication) && checkIndication.length > 0) {
      return reply.status(400).send({ message: "Você já indicou esse prestador." });
    }

    // Insert the new indication
    await sql/*sql*/ `
    INSERT INTO indications
      (id, client_id, provider_id)
    VALUES
      (${id}, ${userId}, ${providerId})
    `;

    // Retrieve the provider's current indication count
    const providerResult = await sql/*sql*/ `
    SELECT indicated FROM users WHERE id = ${providerId}
    `;

    console.log("providerResult:", providerResult);

    if (!Array.isArray(providerResult) || providerResult.length === 0) {
      return reply.status(404).send({ error: "Provider not found." });
    }

    const provider = providerResult[0];
    const newIndicateNumber: number = (provider.indicated || 0) + 1;

    // Update the provider's indication count
    await sql/*sql*/ `
    UPDATE users
    SET indicated = ${newIndicateNumber}
    WHERE id = ${providerId}
    `;

    return reply.status(200).send({ message: "Você indicou esse prestador." });
  });
}
