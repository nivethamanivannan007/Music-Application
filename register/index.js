const service = require('./service')
const bcrypt = require('bcrypt')
const Jwt = require('jsonwebtoken')
const multer = require('../config/multer')

const savedata = async(req,res)=>
{    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(req.body.Password, salt)
    req.body.Password = hashedpassword 
    const details = await service.saveuser(req.body)
    res.send("Stored Successfully")
}
//login form 
const loginmatch = async(req,res)=>
{
    let Mobile = req.body.Mobile
    const loginmail = await service.login(Mobile)
    if(loginmail.length==0)
    {
        res.send({
            code:400,
            message :"Mobile No not found"})  
}
else{
    const hashpassword = loginmail[0].Password
    const Passwordmatch = await bcrypt.compare(req.body.Password, hashpassword)
    const token = await Jwt.sign({Mobile},process.env.Jwtsecretkey,{expiresIn:"30minutes"})
    if(Passwordmatch)
    {
        res.send(
            {
                code:200,
                message: "Login success",
                Token : token
            }
        )
    }
    else{
        res.send({
            code:400,
            message :"Incorrect password"
        })
    }
}}

//update user data when clicking edit
// const update = async(req,res) => {
//     const editdata = await service.updateuser(req.body)
//     res.send("Your new information has been stored ")
// }
const audioVideo2json = async (req, res) => {
    try {
        if ((req.file === undefined) || (req.file === null)) {
            res.status(404).json({ code: 404, message: "Please upload an audio or video file." });
            return;
        }

        const path = "./media" + req.file.filename;
        
        
        // You may need to implement logic for processing audio and video files here.
        // For example, saving the file path to a database or performing specific operations.

        // Assuming you have a service module to handle file processing:
        const result = await multer.audioVideo2json(path);
        for (const item of result){

         const saveav = await service.saveuser(item)
        }

        res.status(200).json({ status: 200, success: true, message: "Uploaded successfully" });
    } catch (error) {
        res.status(500).json({ message: error, status: "not uploaded" });
    }
}
const getaudio1 = async(req ,res)=>
{
   const get = await service.getaudio (req.body)
   res.send(get)
}

module.exports=
{
    savedata,
    loginmatch,
   // update,
   audioVideo2json,
   getaudio1
}