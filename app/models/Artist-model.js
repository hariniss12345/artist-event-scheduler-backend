import { Schema, model } from 'mongoose'

const artistSchema = new Schema({
    username:String,
    email:String,
    password:String
},{timestamps:true})

const Artist = model('Artist', artistSchema)

export default Artist