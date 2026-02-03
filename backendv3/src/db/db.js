const mongoose = require("mongoose");

const connectDb = ()=>{
    mongoose.connect(process.env.MONGODB_URI).then(()=>{
        console.log("Mongo db Connected");
    }).catch((err)=>{
        console.log("Mongodb connection error: ", err);
    })
};

module.exports = connectDb;