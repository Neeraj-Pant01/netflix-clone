const mongoose = require("mongoose");

exports.connection = async () =>{
    try{
        await mongoose.connect(`${process.env.DB_URI}`,{useNewUrlParser:true,useUnifiedTopology:true})
        console.log("database is connected successfully !")
    }catch(err){
        console.log(err)
    }
}