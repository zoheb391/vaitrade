import mongoose from 'mongoose'

const NonLexicalScehma = mongoose.Schema({
    word: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    }
})

export default mongoose.model('NonLexical', NonLexicalScehma)
