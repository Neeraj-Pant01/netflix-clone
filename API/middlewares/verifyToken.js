const jwt = require("jsonwebtoken");
const createError = require("../utils/createError");

const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.authorization

    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.JWT_KEY,(err,payload)=>{
            if(err) return next(createError(403,"token is not valid"))

            req.user = payload;
            next();
        })
    }else{
        next(createError(403,"you are not authenticated !"))
    }
}

module.exports = verifyToken;