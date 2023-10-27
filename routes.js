const express= require('express')
const router = express.Router()
const functions = require('./register/index')
const multer = require('./config/multer')
let routes = (app)=>
{
    router.post('/save', functions.savedata)
    router.post('/login', functions.loginmatch)
    //router.post('/updateuser', functions.update)
    router.post('/audio',multer.single("audio1"),functions.audioVideo2json)
    router.get('/get',functions.getaudio1)
    app.use('/api',router)
}
module.exports= routes