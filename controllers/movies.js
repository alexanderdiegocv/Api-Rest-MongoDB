import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

export class MovieController {
  constructor ({ movieModel }) {
    this.MovieModel = movieModel
  }

  getAll = async (req, res) => {
    const { genre } = req.query
    const movies = await this.MovieModel.getAll({ genre })
    res.json(movies)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const movie = await this.MovieModel.getById({ id })

    if (!movie) return res.status(404).json({ error: 'Movie not found' })

    res.json(movie)
  }

  create = async (req, res) => {
    const result = validateMovie(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newMovie = await this.MovieModel.create(result.data)

    res.status(201).json(newMovie)
  }

  update = async (req, res) => {
    const result = validatePartialMovie(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updatedMovie = await this.MovieModel.update({ id, data: result.data })

    if (!updatedMovie) {
      return res.status(404).json({ error: 'Movie not found' })
    }

    res.json(updatedMovie)
  }

  delete = async (req, res) => {
    const { id } = req.params

    const deletedMovie = await this.MovieModel.delete({ id })

    if (!deletedMovie) {
      return res.status(404).json({ error: 'Movie not found' })
    }

    res.status(204).json({ message: 'Movie deleted' })
  }
}
