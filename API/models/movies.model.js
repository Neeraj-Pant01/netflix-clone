const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
    title:{type:String,required:true,unique:true},
    dec:{type:String},
    img:{type:String},
    imgTitle:{type:String},
    imgSm:{type:String},
    trailer:{type:String},
    video:{type:String},
    year:{type:String},
    limit:{type:Number},
    genere:{type:String},
    isSeries:{type:Boolean, default:false}
},{timestamps:true})

module.exports = mongoose.model("movies",movieSchema)