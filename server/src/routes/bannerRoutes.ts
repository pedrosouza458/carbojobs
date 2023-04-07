import express from 'express'
import { prisma } from '../lib/prisma'
import { Router, Request, Response } from 'express';
import { z } from 'zod';

const router = express.Router()

router.get('/list', async (req: Request, res: Response) => {
  const allBanners = await prisma.banner.findMany({
    include: {
      service: true
    }
  })
  res.json(allBanners)
})

router.get('/listaccepted', async (req: Request, res: Response) => {
  const acceptedBanners = await prisma.banner.findMany({
    where: {
      accept: true
    },
    include: {
      service: true,
    }
  })
  res.send(acceptedBanners)
})

router.get('/:serviceId/list', async (req: Request, res: Response) => {
  const { serviceId } = req.params
  const acceptedServiceBanners = await prisma.banner.findMany({
    where: {
      serviceId
    },
    include: {
      service: true
    }
  })
  res.send(acceptedServiceBanners)
})

router.get('/:serviceId/listaccepted', async (req: Request, res: Response) => {
  const { serviceId } = req.params
  const acceptedServiceBanners = await prisma.banner.findMany({
    where: {
      accept: true,
      serviceId
    },
    include: {
      service: true
    }
  })
  res.send(acceptedServiceBanners)
})



module.exports = router

