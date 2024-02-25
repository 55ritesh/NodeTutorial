const express = require("express");
const app =express();
const db= require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Person = require('./models/person');

app.get('/',function(req,res){
    res.send("Welocome to hotel ... How i can help you?");
})

// Post route to add a person
app.post('/person',async (req,res)=>{
   try{
    const data = req.body 

    // create new preson document using the Mongoose model
    const newPerson = new Person(data);

    // save the new person to database
   const response = await newPerson.save();
   console.log('data saved');
   res.status(200).json(response);
   }
   catch(error){
      console.log(error);
      res.status(500).json({error:'Internal Server Error'});
   }
})

// get method to get the person

app.get('/person',async(req,res)=>{
    try{
        
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);

    }catch{
          
      console.log(error);
      res.status(500).json({error:'Internal Server Error'});

    }
})

app.listen(3000,()=>{
    console.log("listening on port 3000");
})