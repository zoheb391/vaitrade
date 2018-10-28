export const getLexicalDensity = array => {
    return new Promise((resolve) => {
        return NonLexical.countDocuments({ word: {$in: array }}, (err, nonlexicalCount) => {
            let lexicalCount  = array.length - nonlexicalCount
            let lexicalDensity = (lexicalCount/array.length).toFixed(2)
            resolve(lexicalDensity)
        })
    })
}
