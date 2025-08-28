const mongoose  = require("mongoose");


const ownerSchema = mongoose.Schema({
    fullname:String,
    email: String, 
    password: String, 
    picture: String, 
    contact: Number,
    product:{
        type:Array,
        default:[]
    },

});
module.exports = mongoose.model("owner", ownerSchema);