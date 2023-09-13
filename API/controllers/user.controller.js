const userModel = require('../models/user.model')
const CryptoJS = require("crypto-js")
const createError = require('../utils/createError')

//update user
exports.updateUser = async (req,res,next) =>{
    if(req.params.id === req.user.id || req.user.isAdmin){
        if(req.body.password){
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.ENC_KEY).toString()
        }
    try{
        const user = await userModel.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },{
            new:true
        })
        res.status(200).json(user)
    }catch(err){
        next(err)
    }
}
    else{
        next(createError(403,"you can update only your account"))
    }
}


//delete user
exports.deleteUser = async (req,res,next) =>{
    if(req.user.id === req.params.id || req.user.isAdmin){
        try{
            await userModel.findByIdAndDelete(req.params.id);
            res.status(200).json({message:"user has been deleted Sucessfully !"})
        }catch(err){
            next(err)
        }
    }else{
        next(createError(403,"you are not authenticated !"))
    }
}

//get a user
exports.getUser = async (req,res,next) =>{
    try{
        const user = await userModel.findById(req.params.id)
        const{password, ...others} = user._doc

        res.status(200).json(others)
    }catch(err){
        next(err)
    }
}

//get all users
exports.getAll = async (req,res,next) =>{
    const query = req.query.new
    try{
        const users = query ? await userModel.find().sort({_id : -1}).limit(3) : await userModel.find();
        res.status(200).json(users)
    }catch(err){
        next(err)
    }
}

exports.stats = async (req,res,next) =>{
    const today = new Date();
    const lastYear = new Date(today);
    lastYear.setFullYear(today.getFullYear() - 1);
    if(req.user){
        const data = await userModel.aggregate([
            {
                $match:{createdAt: {$gte : lastYear}}
            },
            {
            $project : {
                month : {$month : "$createdAt"}
            }
        },{
            $group:{
                _id: "$month",
                total : {$sum : 1}
            }
        }
    ])
    res.status(200).json(data)
    }else{
        res.status(403).json({message:"you are not authenticated !"})
    }
}