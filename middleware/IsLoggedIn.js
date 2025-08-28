const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async function (req, res, next) {
  if (!req.cookies.token) {
    req.flash("error", "Please login first");
    return res.redirect("/");   // ✅ return lagana zaroori hai
  }

  try {
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);

    let user = await userModel
      .findOne({ email: decoded.email })
      .select("-password");

    if (!user) {
      req.flash("error", "User not found, please login again");
      return res.redirect("/");  // ✅ user null hua to bhi return
    }

    req.user = user;
    next();  // ✅ login successful → aage route chalega
  } catch (err) {
    req.flash("error", "Please login first");
    return res.redirect("/");
  }
};
