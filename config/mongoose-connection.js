const mongoose  = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:mongoose");
mongoose
.connect(`${process.env.MONGODB_URI || config.get("MONGODB_URI")}/cake`);
// .then(function(){
// dbgr("connected");
// })
// .catch(function(err){
//     console.log(err);
// });
module.exports = mongoose.connection;