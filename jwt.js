const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req,res,next)=>{

    // extract the jwt token from the request headers

    const token = req.headers.authorization.split(' ')[1];

    if(!token)
    return res.status(401).json({error:'Unauthorizes'});

    try{
        // verify the JWT token
        const decoded = jwt.verify(token.process.env.JWT_SECRET);

        // Attach user info to the request object
        req.user = jwt.decoded;
        next();

    }
    catch(err){
        console.log(err);
        res.status(401).json({error:'Invalid token'});
    }
}


// function to generate JWT token
const generateToken = (userData)=>{
    // generate a new JWT token using user data
    return jwt.sign(userData,process.env,JWT_SECRET);
}

module.exports={jwtAuthMiddleware,generateToken};