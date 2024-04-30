const z = require("zod")

const movieSchema = z.object({
    title: z.string(),
    year: z.number().int().min(1900).max(2024),
    director: z.string(),
    duration: z.number().int().positive(),
    rate: z.number().min(0).max(10).default(5),
    poster: z.string().url(),
    genre: z.array(z.enum(['Action', 'Drama', 'Adventure', 'Comedy', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi'])),
})

const validateMovie = (object) => {
    return movieSchema.safeParse(object);
}

module.exports = {
    validateMovie
}