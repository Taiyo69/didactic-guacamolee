import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'

const app = express()

app.use(json())
app.disable('x-powered-by')
app.use('/movies', moviesRouter)

app.get('/', (req, res) => {
    console.log('request received')
    res.send('Didactic Guacamole API')
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
}) 
