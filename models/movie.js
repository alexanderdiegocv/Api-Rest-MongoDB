import { MongoClient, ServerApiVersion } from 'mongodb'

import { randomUUID } from 'node:crypto'
import { readJSON } from '../utils.js'

const uri = process.env.MONGODB_URI

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

try {
  console.time('MongoDB Connection')
  await client.connect()
  console.timeEnd('MongoDB Connection')
} catch (error) {
  console.error('Error connecting to MongoDB: ', error)
}

const movies = readJSON('./movies.json')

export class MovieModel {
  static getAll = async ({ genre }) => {
    if (genre) {
      return movies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
      )
    }

    console.info('Getting all movies')
    return movies
  }

  static async getById ({ id }) {
    const movie = movies.find((movie) => movie.id === id)
    return movie
  }

  static async create (data) {
    const newMovie = { id: randomUUID(), ...data }

    movies.push(newMovie)
    return newMovie
  }

  static async update ({ id, data }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id)

    if (movieIndex === -1) return null

    movies[movieIndex] = { ...movies[movieIndex], ...data }
    return movies[movieIndex]
  }

  static async delete ({ id }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id)

    if (movieIndex === -1) return null

    const [deletedMovie] = movies.splice(movieIndex, 1)
    return deletedMovie
  }
}
