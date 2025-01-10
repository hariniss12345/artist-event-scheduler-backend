import mongoose from 'mongoose'

const configureDB = async () => {
    try{
        const db = await mongoose.connect('mongodb://localhost:27017/ArtistPerformance-App')
        console.log('connected to db')
    }catch(err){
        console.log(err)
    }
}

export default configureDB