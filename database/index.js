
const mongoose  = require("mongoose");


mongoose.connect("mongodb+srv://bharatchavhan141:KU0UJLjxi1pHc4SG@cluster0.neblvsg.mongodb.net/YT-Learning-Portal")


// schemas model

const AdminSchema = new mongoose.Schema({
       username : String,
       password: String,
       role:String

})

const AddAdmin = mongoose.model('AddAdmin',AdminSchema)

module.exports = {AddAdmin}