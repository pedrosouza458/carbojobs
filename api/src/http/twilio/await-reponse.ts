// import { FastifyInstance } from "fastify";
// import { sql } from "../../lib/db";
// const MessagingResponse = require('twilio').twiml.MessagingResponse;

// export async function TwilioWebhook(app: FastifyInstance) {
//   app.post("/twilio-webhook", async (request, reply) => {
//     const twiml = new MessagingResponse();
//     const incomingMessage = request.body.Body.toLowerCase().trim();
//     const phone = request.body.From.split(":")[1]; // Extract phone number from 'whatsapp:+<number>'

//     const provider = await sql`
//       SELECT u.id, a.id as appointment_id
//       FROM users u
//       JOIN appointments a ON u.id = a.provider_id
//       WHERE u.phone = ${phone}
//       ORDER BY a.created_at DESC
//       LIMIT 1;`;

//     if (!provider.length) {
//       twiml.message('No appointment found for this provider.');
//       return reply.type('text/xml').send(twiml.toString());
//     }

//     const appointment_id = provider[0].appointment_id;

//     if (incomingMessage === 'Sim') {
//       // await sql`UPDATE appointments SET status = 'accepted' WHERE id = ${appointment_id}`;
//       twiml.message('Appointment accepted.');
//     } else if (incomingMessage === 'Não') {
//       // await sql`UPDATE appointments SET status = 'rejected' WHERE id = ${appointment_id}`;
//       twiml.message('Appointment rejected.');
//     } else {
//       twiml.message('Please reply with "sim" or "não".');
//     }

//     reply.type('text/xml').send(twiml.toString());
//   });
// }