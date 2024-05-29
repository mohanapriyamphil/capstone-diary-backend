require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const postRoutes = require('./routes/posts')
const userRoutes = require('./routes/user')

//express app
const app = express();

//middleware
app.use(cors());

app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next();
})

//routes
app.use('/api/posts', postRoutes)
app.use('/api/user', userRoutes)

app.get('/', (req, res) => {
    res.send("server is running")
})
//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log(`conneted to mongodb and listening on port`, process.env.PORT);
        })
    })
    .catch((err) => {
        console.log(err.message)
    })