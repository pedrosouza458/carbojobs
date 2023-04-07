import express from 'express'
import { prisma } from '../lib/prisma'
import { Router, Request, Response } from 'express';
import { z } from 'zod';
import bcrypt from 'bcrypt'

const router = express.Router()

router.get('/count', async (req: Request, res: Response) => {
  const count = await prisma.provider.count()
  res.json({ count })
})

router.get('/list', async (req: Request, res: Response) => {
  const allProviders = await prisma.provider.findMany({
    include: {
      service: true,
      location: true,
      post: true,
      reply: true
    }
  })
  res.send(allProviders)
})

//  criar clientes
router.post("/create", async (request, reply) => {
  const createProviderBody = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    phone: z.string(),
    serviceId: z.string(),
    locationId: z.string(),
    text: z.string(),
    starAverage: z.number()
  });
  const { name, email, password, phone, serviceId, locationId, text, starAverage } = createProviderBody.parse(request.body);

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const response = await prisma.provider.create({
    data: {
      name,
      email,
      password,
      phone,
      serviceId,
      locationId,
      text,
      starAverage
    },
  });

  return reply.status(201).send("deu certo");
});

// router.post('/login', async (req, res) => {
//    const candidate = await prisma.provider.findUnique({
//     login: req.body.login
//    })

//    if(candidate){
//     ispass
//    }
// })


router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params
  const provider = await prisma.provider.delete({
    where: { id: String(id) },
  })
  res.json({
    success: true,
    payload: provider,
  })
})

module.exports = router