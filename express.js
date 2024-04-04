const express = require('express')
const app = express()

const PORT = process.env.PORT ?? 1234
const moviesJSON = require('./movies.json')

app.disable('x-powered-by')

app.get('/', (req, res) => {
    console.log('request received')
    res.send('Hola mundo')
})

app.get('/movies', (req, res) => {
    res.json(moviesJSON)
})

app.get('/movies/:id', (req, res) => {
    const { id } = req.params


})

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})