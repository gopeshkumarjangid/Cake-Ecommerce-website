const express = require('express');
const router = express.Router();
const {registerUser} = require("../controller/authController");
const {loginUser} = require("../controller/authController");
const {IsLoggedIn} = require("../middleware/IsLoggedIn");
const {Logout} = require("../controller/authController");
const flash = require("connect-flash");

router.get('/verification', function (req, res) {
let success = req.flash("success");
    res.render("index",{success});
});
router.post('/register', registerUser);
router.post("/login",loginUser);
router.post("/logout",Logout);


module.exports = router;