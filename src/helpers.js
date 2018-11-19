import NonLexical from './models/NonLexical'

export const addDefaultWords = array => {
    return new Promise((resolve, reject) => {
        array.map(word => {
            NonLexical.create({ word }, (err, res) => {
                if(err) reject(err)
            })
        })
    })
}

export const getSentenceLexicalDensity = array => {
    return Promise.all(array.map(sentence => {
        let sentenceArray = [ ...sentence.trim().split(' ') ]
        return getLexicalDensity(sentenceArray)
            .then(result => result)
    }))
}

export const getLexicalDensity = array => {
    return new Promise((resolve) => {
        return NonLexical.countDocuments({ word: {$in: array }}, (err, nonlexicalCount) => {
            let lexicalCount  = array.length - nonlexicalCount
            let lexicalDensity = (lexicalCount/array.length).toFixed(2)
            resolve(lexicalDensity)
        })
    })
}
