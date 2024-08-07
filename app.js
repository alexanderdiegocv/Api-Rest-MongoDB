import express, { json } from 'express'

import { corsMiddleware } from './middlewares/cors.js'
import { createMoviesRouter } from './routes/movies.js'

export const createApp = ({ movieModel }) => {
  const app = express()

  app.use(express.json())
  app.use(json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')

  app.use('/movies', createMoviesRouter({ movieModel }))

  const PORT = process.env.PORT ?? 4321

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })

  return app
}
