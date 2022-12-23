import express from 'express'
import { prisma } from './lib/prisma'
import { Router, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './swagger/swagger.json'

const app = express();
const route = Router()

const clientRoute = require('./routes/clientRoutes')
app.use('/clients', clientRoute)

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

app.use(require('./routes/client'));

app.use(route)

//rotas

app.listen(5140, () => 'server running on port 5140')

