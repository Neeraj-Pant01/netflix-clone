const express = require("express")
const dotenv = require("dotenv").config();
const cors = require("cors");
const { connection } = require("./database/connection");
const authRoute = require("./routes/auth.route")
const userRoute = require("./routes/user.route")
const movieRoute = require("./routes/movies.route")
const listRoute = require("./routes/list.route")

const app = express();

app.use(cors())
app.use(express.json())

app.use((err,req,res,next)=>{
    const errStatus = err.status || 500;
    const errMessage = err.message || "internal server error "
    return res.status(errStatus).send(errMessage)
})

app.use('/api/v1/auth',authRoute)
app.use('/api/v1/users',userRoute)
app.use('/api/v1/movies',movieRoute)
app.use('/api/v1/lists',listRoute)

const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>{
    connection()
    console.log(`server is running at the port ${PORT}`)
})