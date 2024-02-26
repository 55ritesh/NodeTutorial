const express = require("express");
const app =express();
const db= require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());



app.get('/',function(req,res){
    res.send("Welocome to hotel ... How i can help you?");
})




// Import the router files

const personRoutes = require('./routes/personRoutes');
const menuItemsRoutes = require('./routes/menuRoutes');

// Use the routers
app.use('/person',personRoutes);
app.use('/menu',menuItemsRoutes);





app.listen(3000,()=>{
    console.log("listening on port 3000");
})