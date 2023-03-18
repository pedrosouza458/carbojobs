import express from 'express'
import { prisma } from '../lib/prisma'
import { Router, Request, Response } from 'express';
import { z } from 'zod';

const router = express.Router()

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const clientComments = await prisma.comment.findMany({
      where: {
        id,
      },
    })
    res.json(clientComments)
  })

  module.exports = router

  