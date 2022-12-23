import express from 'express'
import { prisma } from '../lib/prisma'
import { Router, Request, Response } from 'express';

const router = express.Router()

router.get('/count', async (req: Request, res: Response) => {
    const count = await prisma.client.count()
    res.json({count})
})

router.get('/list', async (req: Request, res: Response) => {
    const allClients = await prisma.client.findMany({
        where:{

        },
    })
    res.json({allClients})
})

router.get('/user/:id', async (req, res) => {
    const { id } = req.params
    const clientById = await prisma.client.findMany({
      where: {
        id,
      },
    })
    res.json(clientById)
  })

module.exports = router