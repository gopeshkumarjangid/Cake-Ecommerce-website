const express = require('express');
const router = express.Router();
const IsLoggedIn = require("../middleware/IsLoggedIn");
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');

// Shop page
router.get('/shop', IsLoggedIn, async function (req, res) {
    let products = await productModel.find();
    let success = req.flash("success");
    res.render("pro", { products, success });
});

// Cart page
router.get("/cart", IsLoggedIn, async function (req, res) {
  let user = await userModel.findOne({ email: req.user.email }).populate("cart");
  let success = req.flash("success");
  let products = (user && user.cart) ? user.cart : [];
  res.render("cart", { products,success });
});



// Add to cart
router.get('/addtocart/:productid', IsLoggedIn, async function (req, res) {
    try {
        let user = await userModel.findOne({ email: req.user.email });
        user.cart.push(req.params.productid);
        await user.save();

        req.flash("success", "Added to cart");
        res.redirect("/shop");   // ✅ redirect back to shop
    } catch (err) {
        console.log(err);
        req.flash("success", "Something went wrong");
        res.redirect("/shop");
    }
});
router.get("/removefromcart/:productid", IsLoggedIn, async function (req, res) {
    try {
        let user = await userModel.findOne({ email: req.user.email });
        user.cart = user.cart.filter(pid => pid.toString() !== req.params.productid);
        await user.save();
        req.flash("success", "Removed from cart");
        res.redirect("/cart");
    } catch (err) {
        console.log(err);
        req.flash("success", "Could not remove item");
        res.redirect("/cart");
    }
});


// Logout
router.get("/logout", IsLoggedIn, async function (req, res) {
    res.redirect("/");
});

module.exports = router;
