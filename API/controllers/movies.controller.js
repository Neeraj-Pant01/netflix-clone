const moviesModel = require("../models/movies.model")
const createError = require("../utils/createError")

exports.createMovie = async (req,res,next) =>{
    if(req.user.isAdmin){
    const newMovie = new moviesModel(req.body)
    try{
        const savedMovie = await newMovie.save()
        res.status(200).json(savedMovie)
    }catch(err){
        next(err)
    }
}else{
    next(createError(403,"you are not authorized to take this action !"))
}
}

exports.updateMovie = async (req,res,next) =>{
    if(req.user.isAdmin){
        try{
            const movie = await moviesModel.findByIdAndUpdate(req.params.id,{
                $set : req.body
            },{
                new : true
            })
            res.status(200).json(movie)
        }catch(err){
            next(err)
        }
    }else{
        next(createError(403,"you are not authorized to take this action !"))
    }
}

exports.deleteMovie = async (req,res,next) =>{
    if(req.user.isAdmin){
        try{
            await moviesModel.findByIdAndDelete(req.params.id)
            res.status(200).json({message:"movie has been deleted sucessfully"})
        }catch(err){
            next(err)
        }
    }else{
        next(createError(403,"you are not authenticated !"))
    }
}

exports.getMovie = async (req,res,next) =>{
    try{
        const movie  = await moviesModel.findById(req.params.id)
        res.status(200).json(movie)
    }catch(err){
        next(err)
    }
}

exports.getAllMovies = async (req,res,next) =>{
    if(req.user.isAdmin){
        try{
            const movies = await moviesModel.find()
            res.status(200).json(movies.reverse())
        }catch(err){
            next(err)
        }
    }else{
        next(createError(403,"you are not authorized !"))
    }
}

//get the random movie
exports.getTheRandom = async (req,res,next) =>{
    type = req.query.type
    let movie;
    try{
        if(type==="series"){
            movie = await moviesModel.aggregate([{
                $match : {isSeries: true}},
                {$sample : {size : 1}}
            ])
        }else{
            movie = await moviesModel.aggregate([{
                $match : {isSeries: false}},
                {$sample : {size : 1}}
            ])
        }
        res.status(200).json(movie)
    }catch(err){
        next(err)
    }
}