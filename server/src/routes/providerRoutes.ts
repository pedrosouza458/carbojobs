import express from 'express'
import { prisma } from '../lib/prisma'
import { Router, Request, Response } from 'express';
import { z } from 'zod';

const router = express.Router()

router.get('/count', async (req: Request, res: Response) => {
    const count = await prisma.provider.count()
    res.json({count})
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
    const { name } = createProviderBody.parse(request.body);
    const { email } = createProviderBody.parse(request.body);
    const { password } = createProviderBody.parse(request.body);
    const { phone } = createProviderBody.parse(request.body);
    const { serviceId } = createProviderBody.parse(request.body);
    const { locationId } = createProviderBody.parse(request.body);
    const { text } = createProviderBody.parse(request.body);
    const { starAverage } = createProviderBody.parse(request.body);

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