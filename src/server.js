import babelPolyfill from 'babel-polyfill'
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import NonLexical from './models/NonLexical'
import { getLexicalDensity } from './helpers'


const app = express()
const port = process.env.SERVER_PORT || 8080

const exclamationRegex = /[!]+/g
const sanitizeRegex = /[.,;']+/g


app.use(bodyParser())
// mongoose.connect('mongodb://mongodb')
mongoose.connect('mongodb://localhost:27017/')

app.post('/complexity', async (req, res) => {

    const input = req.body.input

    if(input.length > 1000){
        res.status(400).send("input too long")
    }
    // replace ! with .
    const replacedInput = input.replace(exclamationRegex, '.').trim().toLowerCase()
    // replace . ; ' and , with empty string
    const sanitizedInput = replacedInput.replace(sanitizeRegex, '')
    // turn string into array of words
    const fullSplit = sanitizedInput.split(' ')

    if(fullSplit.length > 100){
        res.status(400).send("input too long")
    }

    const overall_ld = await getLexicalDensity(fullSplit)
    let data = { data: { overall_ld } }
    res.send(data)

})



app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

export default app
