import { MovieController } from '../controllers/movies.js'
import { Router } from 'express'

export const createMoviesRouter = ({ movieModel }) => {
  const moviesRouter = Router()

  const movieController = new MovieController({ movieModel })

  moviesRouter.get('/', movieController.getAll)

  moviesRouter.get('/:id', movieController.getById)

  moviesRouter.post('/', movieController.create)

  moviesRouter.patch('/:id', movieController.update)

  moviesRouter.delete('/:id', movieController.delete)

  return moviesRouter
}
