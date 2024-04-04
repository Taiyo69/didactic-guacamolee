const express = require('express')
const app = express()

const PORT = process.env.PORT ?? 1234

app.get('/', (req, res) => {
    console.log('request received')
    res.send('Hola mundo')
})

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})