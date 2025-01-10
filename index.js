import express from 'express'
import dotenv from 'dotenv'
import cors from "cors";
import { checkSchema } from 'express-validator'

import configureDB from './config/db.js'

import artistCltr from './app/controllers/artist-cltr.js'
import eventCltr from './app/controllers/event-cltr.js'

import {userRegisterSchema,userLoginSchema} from './app/validators/artistvalidationSchema.js'
import idValidationSchema from './app/validators/idValidationSchema.js'
import eventValidationSchema from './app/validators/eventValidationSchema.js'

import authenticateUser from "./app/middlewares/authenticate.js"

const app=express()
configureDB()
dotenv.config()
const port=process.env.PORT

app.use(express.json())
app.use(cors())

app.post('/api/artists/register',checkSchema(userRegisterSchema),artistCltr.register)
app.post('/api/artists/login',checkSchema(userLoginSchema),artistCltr.login)
app.get('/api/artists/profile',authenticateUser,artistCltr.profile)
app.get('/api/artists',artistCltr.list)

app.post('/api/events',authenticateUser,checkSchema(eventValidationSchema),eventCltr.create)
app.get('/api/events',authenticateUser,eventCltr.list)
app.put('/api/events/:id',authenticateUser,checkSchema(idValidationSchema),checkSchema(eventValidationSchema),eventCltr.update)
app.delete('/api/events/:id',authenticateUser,checkSchema(idValidationSchema),eventCltr.delete)

app.get('/api/artists/:artistId',eventCltr.getEventByArtist)
app.get('/api/artists/:artistId/events/:eventId',eventCltr.getSingleEventByArtist)

app.listen(port,()=>{
    console.log('server is running on port ',process.env.PORT)
})