const userModel = require("../models/user.model")
const createError = require("../utils/createError")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")

exports.register = async (req,res,next) =>{
    try{
        const user = await userModel.findOne({email:req.body.email})
        if(user) return next(createError(403,"user already exists"))

        const newUSer = new userModel({...req.body, password: CryptoJS.AES.encrypt(req.body.password,process.env.ENC_KEY).toString(),
        })
        await newUSer.save()
        res.status(200).json(newUSer)
    }catch(err){
        next(err)
    }
}

exports.login = async (req,res,next) =>{
    try{
        const user = await userModel.findOne({email:req.body.email})

        const bytes  = CryptoJS.AES.decrypt(user.password, process.env.ENC_KEY);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);

        if(originalText === req.body.password){
            const token = jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT_KEY,{expiresIn:"1d"})
            const{password,...others} = user._doc;

            res.status(200).json({token,...others})
        }else{
            return next(createError(403,"invalid credentials !"))
        }
    }catch(err){
        next(err)
    }
}


