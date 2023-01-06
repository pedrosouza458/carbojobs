import express from 'express'
import { Router, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './swagger/swagger.json'
import { prisma } from './lib/prisma'
import { z } from 'zod';
import cors from "cors";

const app = express();
const route = Router()

app.use(cors())
const clientRoute = require('./routes/clientRoutes')
app.use('/clients', clientRoute)
const providerRoute = require('./routes/providerRoutes')
app.use('/providers', providerRoute)
const commentsRoute = require('./routes/commentsRoutes')
app.use('/comments', commentsRoute)
const bannersRoute = require('./routes/bannerRoutes')
app.use('/banners', bannersRoute)
const postsRoute = require('./routes/postRoutes')
app.use('/posts', postsRoute)


app.use(express.json())

//documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.get('/terms', (req: Request, res: Response) => {
    return res.json({
        message: "Termos de Serviço"
    })
  })

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'hello world with Typescript' })
})

app.use(route)

app.listen(5140, () => 'server running on port 5140')

