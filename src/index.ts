import mongoose from 'mongoose'
require('dotenv').config();
import express from 'express';
import router from '../src/routes/index.route'


import {urlencoded} from 'express'
const app = express();

app.use('/api/v1', router)

const MongoDB_URI = process.env.MongoDB_URI

mongoose.connect(`${MongoDB_URI}`)
.then(() => {
    console.log("connected to database")
})
.catch(() => {
    console.log("Error occured")
})

app.use(urlencoded({extended : false}));
app.use(express.json())

const PORT = process.env.PORT || 6000;


app.listen(PORT, () => {
    // database()
    console.log(`Server is running on port ${PORT}`)
})