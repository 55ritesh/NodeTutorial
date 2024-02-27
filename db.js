const mongoose = require('mongoose');
 const mongoURL = 'mongodb://localhost:27017/hotels';
// const mongoURL = 'mongodb+srv://ritesh02072002:Pnrvk55@cluster0.dlu1ypw.mongodb.net/'

mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db = mongoose.connection;

db.on('connected',()=>{
    console.log('Connected to MongoDb server');
});

db.on('error',(err)=>{
    console.error('MongoDB connection error:',err);
})


module.exports = db;