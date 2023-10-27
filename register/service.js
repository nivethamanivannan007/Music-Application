const mongoose = require('mongoose')
const userschema = new mongoose.Schema(
    {
        Category: String,
        Mobile : Number,
        Name: String,
        Date_of_Birth: String,
        Gender : String,
        Email : String,
        Password : String,
        confirm_password: String,
        Address_1 : String,
        Address_2 : String,
        Address_3 : String,
        District : String,
        State : String, 
        Pincode : String,
        Audio_video : String
    }
)

const collect = new mongoose.model('user', userschema)
const saveuser = async(data)=>
{
    const details = new collect(data)
    const userdetails = await details.save()
    return userdetails 
}
//login function 
const login = async(data)=>
{
    const mailmatch = await collect.aggregate ([{$match:{Mobile:data}}])
    return mailmatch
}

//update user data when clicking edit

const updateuser = async(data) => {
    const details = await collect.findOneAndUpdate({Mobile:data.Mobile},
        {$set: {
            Address_1:data.Address_1,
            Address_2:data.Address_2,
            Address_3:data.Address_3,
            District : data.District,
            State : data.State,
            Pincode : data.Pincode,
            Audio_video : data.Audio_video


        }},{multi:true})
        return details
    }
const getaudio = async(data)=>
{
    const get = await collect.find()
    return get
}

module.exports=
{
    saveuser, 
    login , 
    updateuser ,
    getaudio
}