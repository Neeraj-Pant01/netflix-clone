const { updateUser, deleteUser, getUser, getAll, stats} = require("../controllers/user.controller");
const verifyToken = require("../middlewares/verifyToken");

const router = require("express").Router()

router.put('/:id',verifyToken,updateUser)
router.delete('/:id',verifyToken,deleteUser)
router.get('/:id',verifyToken,getUser)
router.get('/',verifyToken,getAll)
router.get('/find/statistics',verifyToken,stats)

module.exports = router;