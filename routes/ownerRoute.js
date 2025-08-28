const express = require('express');
const router = express.Router();
const ownerModel = require("../models/owner-model");
if (process.env.NODE_env === "development") {
    router.post('/create', async function (req, res) {
        let owner = await ownerModel.find();
        if (owner.length > 0) return res.send(500).send("You don't allow to create the owner");

     let {fullname, email, password } = req.body;
        let createdOwner = await ownerModel.create({
            fullname,
            email ,
            password,
        })
        res.send(202).send(createdOwner);
    });
}
router.get('/admin', function (req, res) {
    let success = req.flash("success");
    res.render("CreateProduct",{success});
});

module.exports = router;