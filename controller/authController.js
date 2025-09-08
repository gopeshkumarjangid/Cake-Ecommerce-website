const userModel = require("../models/user-model");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const {generateToken} = require("../utils/generateToken");
const productModel = require("../models/product-model");

module.exports.registerUser = async function (req, res) {
  try {
    let { fullname, email, password } = req.body;

    let user = await userModel.findOne({ email: email });

    if (user) {
      req.flash("success", "User already registered");
      return res.redirect("/users/verification");
    }

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) return res.send(err.message);

        let user = await userModel.create({
          fullname,
          email,
          password: hash,
        });

        let token = generateToken(user);
        res.cookie("token", token);

        req.flash("success", "New account has been created!");
        res.redirect("/users/verification");
      });
    });
  } catch (err) {
    res.send(err.message);
  }
};





module.exports.loginUser = async function (req, res) {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email });

  if (!user) {
    req.flash("success", "Email not registered");
    return res.redirect("/users/verification");
  }

  bcrypt.compare(password, user.password, async function (err, result) {
    if (result) {
      let token = generateToken(user);
      res.cookie("token", token);
      req.flash("success", "Logged in successfully!");
      res.redirect("/shop");  // example
    } else {
      req.flash("success", "Password is incorrect");
      res.redirect("/users/verification");
    }
  });
};

module.exports.Logout = function(req,res){
    res.cookie("token","");
    res.redirect("/");
}