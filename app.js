const express = require('express')
const crypto = require('node:crypto')
const app = express()

const PORT = process.env.PORT ?? 1234
const movies = require('./movies.json')
const { validateMovie, validatePartialMovie } = require('./schemas/movies')
const ACCEPTED_ORIGINS = [
    'http://localhost:8080',
]

app.use(express.json())
app.disable('x-powered-by')

app.get('/', (req, res) => {
    console.log('request received')
    res.send('Hola mundo')
})

app.get('/movies', (req, res) => {
    const origin = req.header('origin')

    if(ACCEPTED_ORIGINS.includes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin', origin)
    }

    const { genre } = req.query

    if (genre) {
        const filteredMovies = movies.filter(movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()))
        return res.json(filteredMovies)
    }
    res.json(movies)
})

app.get('/movies/:id', (req, res) => {
    const origin = req.header('origin')

    if(ACCEPTED_ORIGINS.includes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin', origin)
    }

    const { id } = req.params
    const movie = movies.find(movie => movie.id === id)
    if(movie) return res.json(movie)

    res.status(404).json({ message: 'Movie not found' })
})

app.delete('/movies/:id' , (req, res) => {
    const origin = req.header('origin')

    if(ACCEPTED_ORIGINS.includes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin', origin)
    }

    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if(movieIndex === -1) return res.status(404).json({ message: 'Movie not found' })

    movies.splice(movieIndex, 1)
    
    return res.json({ message: 'Movie deleted' })
})

app.post('/movies', (req, res) => {
    const result = validateMovie(req.body)

    if(result.error) {
       return res.status(400).json({ error: result.error.message })
    } 

    const newMovie = {
        id: crypto.randomUUID(),
        ...result.data
    }

    movies.push(newMovie)

    res.status(201).json(newMovie)
})

app.patch('/movies/:id', (req, res) => {
    const result = validatePartialMovie(req.body)

    if(!result.success) return res.status(400).json({ error: result.error.message })
    
    const { id } = req.params;
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if(movieIndex === -1) return res.status(404).json({ message: 'Movie not found' })

    const updateMovie = {
        ...movies[movieIndex],
        ...result.data
    }   

    movies[movieIndex] = updateMovie;
    
    return res.json(updateMovie)
})

app.options('/movies/:id', (req, res) => {
    const origin = req.header('origin')

    if(ACCEPTED_ORIGINS.includes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin', origin)
        res.header('Access-Control-Allow-Methods', 'GET, POST, POST, PATCH, DELETE')
    }

    res.sendStatus(200)
})

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
}) 
