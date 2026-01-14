const jwt = require('jsonwebtoken')

const jwtMiddleware =(req,res,next)=>{

    // token is passed feom client to server via request headers in authoraization key in request headers
    let token = req.headers.authorization.split(' ')[1]

   try {
    
    if(token){
         let decodedData = jwt.verify(token,process.env.jwtSecretKey)

         if(decodedData){
            //next and update the req

            req.user = decodedData.email
            next()


         }else{
             res.status(401).json({message : 'Invalid token, Please login'})
         }



    }else{
        res.status(401).json({message : 'Token is required, Please login'})
    }

   } catch (error) {
    res.status(500).json({message : 'Something went wrong while validating token, Please try login again'})
    
   }
}

module.exports = jwtMiddleware