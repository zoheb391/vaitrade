import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

const app = express()
const port = process.env.SERVER_PORT || 8080

app.use(bodyParser())
mongoose.connect('mongodb://mongodb')

app.get('/', (req, res) => {
    res.send('ok')
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
