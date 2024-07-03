import { FastifyInstance } from "fastify";
import { sql } from "../../../../lib/db";
import { Provider } from "../../../interfaces/provider-interface";

export async function GetProviders(app: FastifyInstance) {
  app.get("/providers", async (request, reply) => {
    let { page, city, name, service }: any = request.query;

    const limit = 8; // Number of records per page
    if (!page) {
      page = 1;
    }

    const offset = (Number(page) - 1) * limit;

    const providers = await sql<Provider[]>/*sql*/ `
     SELECT "id", "name", "avatar_url", "service", "city", "description", "indicated"
     FROM users 
     WHERE "role" ='Prestador'
     ${city ? sql/*sql*/ `AND "city" = ${city}` : sql``}  
     ${name ? sql/*sql*/ `AND "name" ILIKE ${name + "%"}` : sql``}  
     ${service ? sql/*sql*/ `AND "service" = ${service}` : sql``}  
     ORDER BY indicated DESC
     OFFSET ${offset} LIMIT ${limit}
    `;
    return reply.send(providers);
  });
}
