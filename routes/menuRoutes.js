const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');


// Post Method to add a menuItem

router.post('/',async (req,res)=>{
    try{
       
        const data = req.body;
        const newMenu = new MenuItem(data);
        const response = await newMenu.save();

        console.log('data saved');
        res.status(200).json(response);

    }
    catch(err){
        console.log(error);
        res.status(500).json({error:'Internal Server Error'});
    }
})

// GET METHOD to get Menu Item

router.get('/',async (req,res)=>{
    try{
        const data = await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data);

    }catch{
          
      console.log(error);
      res.status(500).json({error:'Internal Server Error'});

    }
})


module.exports=router;