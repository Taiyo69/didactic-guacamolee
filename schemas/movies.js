const z = require('zod')

const movieSchema = z.object({
    title: z.string(),
    year: z.number().int().min(1950).max(2024),
    director: z.string(),
    duration: z.number().int().positive(),
    rate: z.number().min(0).max(10),
    poster: z.string().url(),
    genre: z.array(
        z.enum(['Action', 'Adventure', 'Horror', 'Comedy', 'Drama'])
    )
})

const validateMovie = (object) => {
    return 
}