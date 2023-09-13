const mongoose = require("mongoose");

const lsitSchema = new mongoose.Schema({
    title:{type:String,required:true},
    type:{type:String},
    genere:{type:String},
    content:{type:Array}
})

module.exports = mongoose.model('lists',lsitSchema)