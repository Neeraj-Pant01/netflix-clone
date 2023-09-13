const { createList, deleteList, getTheList } = require("../controllers/list.controller");
const verifyToken = require("../middlewares/verifyToken");

const router = require("express").Router();

router.post('/',verifyToken,createList)
router.delete('/:id',verifyToken,deleteList)
router.get('/',verifyToken,getTheList)


module.exports = router;