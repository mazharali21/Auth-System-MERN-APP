const mongoose = require('mongoose');

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.URI);
        console.log("MongoDB connected Successfully!");
        
    }catch(err){
        console.log("Connection Failed!", err);
    }
}

module.exports = connectDB;