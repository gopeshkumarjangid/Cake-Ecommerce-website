const express = require('express');
const router = express.Router();
const {registerUser} = require("../controller/authController");
const {loginUser} = require("../controller/authController");
const {IsLoggedIn} = require("../middleware/IsLoggedIn");
const {Logout} = require("../controller/authController");
router.get('/', function (req, res) {
    res.send("hey");
});
router.post('/register', registerUser);
router.post("/login",loginUser);
router.get("/logout",Logout);


module.exports = router;