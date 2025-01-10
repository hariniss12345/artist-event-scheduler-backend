import Event from '../models/event-model.js'
import { validationResult} from 'express-validator'
import pkg from 'opencage-api-client';
import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

const eventCltr = {}

// Ensure the API key is being loaded correctly
const apiKey = process.env.API_KEY;

const client = pkg;  // 'client' is the default export of the opencage-api-client

// Function to geocode address using OpenCage API
async function geocodeAddress(address) {
  console.log('Geocoding address:', address); // Log the address to check its value

  try {
    if (!apiKey) {
      throw new Error('API key is missing');
    }

    // Call the geocode method with address and the API key
    const result = await client.geocode({ q: address, key: apiKey });

    if (result.status.code === 200 && result.results.length > 0) {
      const { lat, lng } = result.results[0].geometry; // Extract latitude and longitude
      console.log('Geocoding result:', lat, lng); // Log the geocoding result
      return { lat, lon: lng }; // OpenCage returns 'lng' for longitude
    } else {
      console.log('Address not found in OpenCage response');
      throw new Error('Address not found');
    }
  } catch (error) {
    console.log('Error during geocoding:', error.message);
    throw new Error('Error geocoding address: ' + error.message);
  }
}

eventCltr.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const body = req.body;
  const { address } = body; // Extract address from the request body

  try {
    // Geocode the address if provided
    if (address) {
      const { lat, lon } = await geocodeAddress(address);
      body.latitude = lat;    // Add latitude to the request body
      body.longitude = lon;   // Add longitude to the request body
    }

    // Set the artistId to the current user's ID
    body.artistId = req.currentUser.userId;

    // Create the event in the database
    const event = await Event.create(body);

    if (!event) {
      return res.status(404).json({ error: 'Event could not be created' });
    }

    // Respond with the created event
    res.json(event);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

eventCltr.list=async(req,res)=>{
    try{
        const event=await Event.find({artistId:req.currentUser.userId})
        res.json(event)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'something went wrong'})
    }
}

eventCltr.update=async(req,res)=>{
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({error:errors.array()})
        }
        try{
            const id=req.params.id
            const body=req.body
            const event=await Event.findOneAndUpdate({_id:id,artistId:req.currentUser.userId},body,{new:true,runValidators:true})
            if(!event){
                return res.status(404).json({error:'record not found'})
            }
            res.json(event)
    
        }catch(err){
            console.log(err)
            res.status(500).json({error:'something went wrong'})
        }
    }

eventCltr.delete=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }
    try{
        const id=req.params.id
        const event=await Event.findOneAndDelete({_id:id,artistId:req.currentUser.userId})
        if(!event){
            return res.status(404).json({error:'record not found'})
        }
        res.json(event)

    }catch(err){
        console.log(err)
        res.status(500).json({error:'something went wrong'})
    }
}


// eventCltr.getEventByArtist=async(req,res)=>{
//   const { artistId } = req.params;
//   try {
//     // Fetch events that are related to this artist
//     const events = await Event.find({ artist: artistId });  // Adjust according to your schema
    
//     if (events.length === 0) {
//       return res.status(404).send({ message: 'No events found for this artist' });
//     }
    
//     res.json(events);  // Send the list of events for the artist as JSON response
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: 'Error fetching events' });
//   }
// }

eventCltr.getSingleEventByArtist=async(req,res)=>{
    const { artistId, eventId } = req.params
    try {
      const event = await Event.findOne({ 
        artistId: artistId, 
        _id: eventId,
      });
  
      if (!event) {
        return res.status(404).json({ error: 'Event not found for this artist' });
      }
  
      res.json(event);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong' });
    }
}

eventCltr.getEventByArtist=async(req,res)=>{
  const { artistId } = req.params
  try {
    const event = await Event.find({ 
      artistId: artistId, 
    });

    if (!event) {
      return res.status(404).json({ error: 'Event not found for this artist' });
    }

    res.json(event);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
export default eventCltr
