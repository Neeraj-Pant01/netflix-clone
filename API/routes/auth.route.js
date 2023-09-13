const { register, login, getUser } = require("../controllers/auth.controller");
const verifyToken = require("../middlewares/verifyToken");

const router = require("express").Router();

router.post('/register',register)
router.post('/login',login)

module.exports = router;