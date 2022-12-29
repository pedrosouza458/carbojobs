import express from 'express'
import { prisma } from '../lib/prisma'
import { Router, Request, Response } from 'express';
import { z } from 'zod';

const router = express.Router()

router.get('/client/:clientId', async (req, res) => {
    const { clientId } = req.params
    const clientComments = await prisma.comment.findMany({
      where: {
        clientId
      },
    })
    res.json(clientComments)
  })

router.get('/provider/:providerId', async (req, res) => {
    const { providerId } = req.params
    const providerComments = await prisma.comment.findMany({
      where: {
        providerId
      },
    })
    res.json(providerComments)
  })

  module.exports = router