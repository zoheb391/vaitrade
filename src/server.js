import babelPolyfill from 'babel-polyfill'
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import NonLexical from './models/NonLexical'
import { getLexicalDensity, getSentenceLexicalDensity  } from './helpers'


const app = express()
const port = process.env.SERVER_PORT || 8080

const exclamationRegex = /[!]+/g
let sanitizeRegex = /[.,;']+/g


app.use(bodyParser())
mongoose.connect('mongodb://mongodb')

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
    let dataObj = { data: { overall_ld } }

    if (req.query.mode === 'verbose'){

        // keep periods in the string to identify sentence stop
        sanitizeRegex = /[,;']+/g

        // split by sentences, put them in an array and remove empty strings
        let sentenceSplit = replacedInput.replace(sanitizeRegex, '').split('.').filter(Boolean)

        let sentence_ld = await getSentenceLexicalDensity(sentenceSplit)
        dataObj.data.sentence_ld = sentence_ld
    }

    res.send(dataObj)
})


app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

export default app
