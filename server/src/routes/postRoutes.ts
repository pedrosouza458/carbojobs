import express from 'express'
import { prisma } from '../lib/prisma'
import { Router, Request, Response } from 'express';
import { z } from 'zod';
import bcrypt from 'bcrypt';

const router = express.Router()

router.get('/list', async (req: Request, res: Response) => {
    const allPosts = await prisma.post.findMany({
      include: {
        Client: true,
        Provider: true,
        comment: true,
        service: true
      }
    })
    res.send(allPosts)
  })

module.exports = router