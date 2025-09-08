const express = require('express');
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");
const flash = require("connect-flash");


router.get('/', async function (req, res) {
  try {
    let products = await productModel.find();
    res.render("shop", { products });   // shop.ejs me products bheje
  } catch (err) {
    res.send(err.message);
  }
});

// POST /products/create
router.post('/create', upload.single('image'), async function (req, res) {
  try {
    let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

    await productModel.create({
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
      image: `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
    });

    req.flash("success", "Product created successfully");
    res.redirect("/shop");  // yaha /products/shop hoga (kyunki productRoute /products par mounted hai)
  }
  catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
