import {Schema,model} from 'mongoose'

const eventSchema=new Schema({
    title:{
        type:String
    },
    venue:{
        type:String
    },
    address:{
        type:String
    },
    artistId:{
        type:Schema.Types.ObjectId,
        ref:'Artist'
    },
    eventDate:{
        type:Date
    },
    price:{
        type:String
    },
    time:{
        type:String
    },
    latitude: { type: Number, required: false },
    longitude: { type: Number, required: false },
},{timestamps:true})

const Event=model('Event',eventSchema)

export default Event