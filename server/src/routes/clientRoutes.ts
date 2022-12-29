import express from 'express'
import { prisma } from '../lib/prisma'
import { Router, Request, Response } from 'express';
import { z } from 'zod';

const router = express.Router()

router.get('/count', async (req: Request, res: Response) => {
  const count = await prisma.client.count()
  res.json({count})
})

router.get('/list', async (req: Request, res: Response) => {
  const allClients = await prisma.client.findMany()

  res.json({allClients})
})

  //  criar clientes
router.post("/create", async (request, reply) => {
    const createClientBody = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
      phone: z.string(),
      locationId: z.string(),
      text: z.string()
    });
    const { name } = createClientBody.parse(request.body);
    const { email } = createClientBody.parse(request.body);
    const { password } = createClientBody.parse(request.body);
    const { phone } = createClientBody.parse(request.body);
    const { locationId } = createClientBody.parse(request.body);
    const { text } = createClientBody.parse(request.body);

    const response = await prisma.client.create({
      data: {
        name,
        email,
        password,
        phone,
        locationId,
        text
      },
    });

    return reply.status(201).send({response});
  });

module.exports = router

function cors(): any {
  throw new Error('Function not implemented.');
}

