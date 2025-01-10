import jwt from 'jsonwebtoken'
export default function authenticateUser(req,res,next) {
    let token=req.headers['authorization']
    if(!token){
        return res.status(401).json({errors:'token is required'})
   }
   token=token.split(' ')[1]
   try{
        const tokenData=jwt.verify(token,process.env.JWT_SECRET)
        req.currentUser={userId : tokenData.userId}
        next()
    }catch(err){
        return res.status(401).json({errors:err.message})
   }
}
