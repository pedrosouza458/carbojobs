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
      include: {
        predecessor: true,
        reply: true
      }
    })
    res.json(clientComments)
  })

router.get('/provider/:providerId', async (req, res) => {
    const { providerId } = req.params
    const providerComments = await prisma.comment.findMany({
      where: {
        providerId
      },
      include: {
        predecessor: true,
        reply: true
      }
    })
    res.json(providerComments)
  })

  router.get('/:id', async (req, res) => {
    const { id } = req.params
    const providerComments = await prisma.comment.findUnique({
      where: {
        id: String(id)
      },
      include: {
         predecessor: true,
         reply: true
      }
    })
    res.json(providerComments)
  })

  module.exports = router

  