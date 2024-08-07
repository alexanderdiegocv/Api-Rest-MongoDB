import z from 'zod'

const movieSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
    invalid_type_error: 'Title must be a string'
  }),
  year: z
    .number({
      required_error: 'Year is required',
      invalid_type_error: 'Year must be a number'
    })
    .int()
    .min(1900)
    .max(2030),
  director: z.string({
    required_error: 'Director is required',
    invalid_type_error: 'Director must be a string'
  }),
  duration: z
    .string({
      required_error: 'Duration is required',
      invalid_type_error: 'Duration must be a string'
    })
    .regex(/^\d{2}:\d{2}$/),
  rate: z
    .number({
      required_error: 'Rate is required',
      invalid_type_error: 'Rate must be a number'
    })
    .min(0)
    .max(10)
    .default(0),
  genre: z.array(
    z.enum([
      'action',
      'comedy',
      'drama',
      'fantasy',
      'horror',
      'mystery',
      'romance',
      'thriller',
      'western'
    ]),
    {
      required_error: 'Genre is required',
      invalid_type_error: 'Genre must be an array of strings'
    }
  )
})

export function validateMovie (movie) {
  return movieSchema.safeParse(movie)
}

export function validatePartialMovie (movie) {
  return movieSchema.partial().safeParse(movie)
}
