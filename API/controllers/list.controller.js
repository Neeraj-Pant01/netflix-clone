const listModel = require("../models/list.model")
const createError = require("../utils/createError")

//createList
exports.createList = async (req, res, next) => {
    if (req.user.isAdmin) {
        try {
            const List = new listModel(req.body);
            await List.save()
            res.status(200).json(List)
        } catch (err) {
            next(err)
        }
    } else {
        next(createError(403, "you are not authorized !"))
    }
}

//deleteList
exports.deleteList = async (req, res, next) => {
    if (req.user.isAdmin) {
        try {
            await listModel.findByIdAndDelete(req.params.id)
            res.status(200).json({ mesage: "movie has been deleted !" })
        } catch (err) {
            next(err)
        }
    } else {
        next(createError(403, "you are not authorized !"))
    }
}

//get the list
exports.getTheList = async (req, res, next) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];
    try {
        if (typeQuery) {
            if (genreQuery) {
                list = await listModel.aggregate([
                    { $match: { type: typeQuery, genere: genreQuery }},
                    { $sample: { size: 10 } }
                ]);
            } else {
                list = await listModel.aggregate([{$match:{type:typeQuery}},{$sample:{size: 10}}])
            }
        } else {
            list = await listModel.aggregate([{ $sample: { size: 10 } }]);
        }
        res.status(200).json(list);
    } catch (err) {
        res.status(500).json(err);
    }
}
