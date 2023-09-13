const { createMovie, updateMovie, deleteMovie, getMovie, getAllMovies, getTheRandom } = require("../controllers/movies.controller");
const verifyToken = require("../middlewares/verifyToken");

const router = require("express").Router()

router.post('/create',verifyToken,createMovie)
router.put('/:id',verifyToken,updateMovie)
router.delete('/:id',verifyToken,deleteMovie)
router.get('/:id',verifyToken,getMovie)
router.get('/',verifyToken,getAllMovies)
router.get('/get/movie/random',verifyToken,getTheRandom)

module.exports = router;