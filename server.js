const express = require("express");
const app =express();
const db= require('./db');


const passport=require('./auth');

const bodyParser = require('body-parser');
app.use(bodyParser.json());


// MiddleWare function
const logRequest = (req,res,next)=>{
    console.log(`[${new Date().toLocaleString}] Request Made to : ${req.originalUrl}`);

    next(); // Move on to the next phase
}

// everywhere to add the middleware
app.use(logRequest);


// authentication
passport.use(new LocalStrategy(async (USERNAME,password,done)=>{
    try{

        console.log('Received credential:', USERNAME , password);
        const user = await Person.findOne({usename:USERNAME});

        if(!user){
            return done(null,false,{message:'Incorrect username.'});
        }

        const isPasswordMatch = user.password === password?true:false;

        if(isPasswordMatch){
            return done(null,user);
        }else{
            return done(null,false,{message:'Incorrect password.'});
        }

    }catch(error){
          return done(err);
    }
}))

app.use(passport.initialize());


// app.get('/',function(req,res){
//     res.send("Welocome to hotel ... How i can help you?");
// })

app.get('/',passport.authenticate('local',{session:false}),function(req,res){
    res.send("Welocome to hotel ... How i can help you?");
})

// Import the router files

const personRoutes = require('./routes/personRoutes');
const menuItemsRoutes = require('./routes/menuRoutes');

// Use the routers
app.use('/person',personRoutes);
app.use('/menu',menuItemsRoutes);

// adding middleware in route 
// app.use('/menu',logRequest,menuItemsRoutes);

app.listen(3000,()=>{
    console.log("listening on port 3000");
})