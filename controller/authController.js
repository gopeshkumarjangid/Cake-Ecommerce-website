const userModel = require("../models/user-model");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const {generateToken} = require("../utils/generateToken");
const productModel = require("../models/product-model");
module.exports.registerUser = async function (req, res) {

    try {
        let { fullname, email, password } = req.body;

        let user = await userModel.findOne({email:email});
        if(user){
            return res.status(404).send("already registered");

        }

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt,async function (err, hash) {
                if (err) return res.send(err.message);
                else {
                    let user = await userModel.create({
                        fullname,
                        email,
                        password: hash,
                    });
                    let token = generateToken(user);
                    res.cookie("token",token);
                    res.redirect("/");
                    
                }
            })
        });
    }
    catch (err) {
        res.send(err.message);
    }
}




module.exports.loginUser = async function(req,res){
    let {email,password} = req.body;
    let user = await userModel.findOne({email});
    if(!user){
        return res.send("Wrong detail");
    }
    bcrypt.compare(password, user.password , async function(err, result){
       if(result){
        let token = generateToken(user);
        res.cookie("token", token);
         let products = await productModel.find();
             res.render("pro",{products});
       }
       else{
        return res.send("password is incorrect");
       }
    });

}
module.exports.Logout = function(req,res){
    res.cookie("token","");
    res.redirect("/products/shop");
}