import Artist from '../models/Artist-model.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { validationResult} from 'express-validator'
const artistCltr = {}

artistCltr.register=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const body=req.body;
    const artist = new Artist (body)
    try {
        const salt=await bcryptjs.genSalt()
        const hashPassword=await bcryptjs.hash(body.password,salt)
        artist.password=hashPassword
        await artist.save();
        res.status(201).json(artist);
    }catch(err){
        res.status(500).json({error:'Something went wrong'})
    }
}

artistCltr.login=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body =req.body;
    try{
        const artist =await Artist.findOne({email:body.email})

        if(!artist){
            return res.status(404).json({errors:'invalid email'})
        }

        const isValidUser=await bcryptjs.compare(body.password,artist.password)
        if(!isValidUser){
            return res.status(404).json({errors:'invalid email/ password'})
        }
      
       const token=jwt.sign({userId:artist._id},process.env.JWT_SECRET,{expiresIn:'7d'})
       res.json({token:`Bearer ${token }`})
    }catch(err){
        console.log(err)
        res.status(500).json({errors:'Something went wrong'})
    }
}

artistCltr.profile=async (req,res)=>{
    try{
        const artist=await Artist.findById(req.currentUser.userId)
        res.json(artist)
    }catch(err){
        console.log(err)
        res.status(500).json({errors:'something went wrong'})
    }
}

artistCltr.list=async(req,res)=>{
    try{
        const artists=await Artist.find()
        res.json(artists)

    }catch(err){
        console.log(err)
        res.status(500).json({error:'something went wrong'})
    }
}

export default artistCltr
