const express = require('express');
const router = express.Router();

const Person = require('../models/person');


// Post route to add a person
router.post('/',async (req,res)=>{
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
 
 router.get('/',async(req,res)=>{
     try{
         
         const data = await Person.find();
         console.log('data fetched');
         res.status(200).json(data);
 
     }catch{
           
       console.log(error);
       res.status(500).json({error:'Internal Server Error'});
 
     }
 })

 router.get('/:workType',async (req,res)=>{
    try{

        const workType = req.params.workType;
        if(workType=='chef' || workType=='manager' || workType == 'waiter'){

            const response = await Person.find({work:workType});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error:'Invalid work type'});
        }

    }catch(err){
        console.log(error);
      res.status(500).json({error:'Internal Server Error'});
    }
})

router.put(':/id',async(req,res)=>{
    try{
       
        const personId = req.params.id; // extract the id from the URL parameter
        const updatePersonData = req.body;// update data for the person

        const response = await Person.findByIdAndUpdate(personId,updatePersonData,{
            new:true, // return the updated documents
            runValidators:true, // run mongoose validation
        })

        if(!response){
            return res.status(404).json({error:'Person not found'});
        }
        console.log('data updated');
        res.status(200).json(response);

    }
    catch(err){
      console.log(error);
      res.status(500).json({error:'Internal Server Error'});
    }
})


router.delete(':/id',async (req,res)=>{
    try{
     
        const personId = req.params.id;
        const response = await Person.findByIdAndRemove(personId);

        if(!response){
            return res.status(404).json({error:'Person not found'});
        }
        console.log('data deleted');
        res.status(200).json({message: 'person Deleted Successfully'});



    }
    catch(err){
        console.log(error);
        res.status(500).json({error:'Internal Server Error'});
    }
})


module.exports = router;