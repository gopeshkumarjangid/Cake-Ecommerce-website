const express = require('express');
const app = express();
const path = require('path');
require("dotenv").config();
const cookieParser = require('cookie-parser');
const db = require("./config/mongoose-connection");
const productRoute = require("./routes/productRoute");
const ownerRoute = require("./routes/ownerRoute");
const userRoute = require("./routes/userRoute");
const index = require("./routes/index");
const expressSession = require("express-session");
const flash = require("connect-flash");
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(
    expressSession({
        resave:false,
        saveUninitialized:false,
        secret:process.env.EXPRESS_SESSION_SECRET,
    })
)
app.use(flash());

app.use('/owners',ownerRoute);
app.use('/products',productRoute);
app.use('/users',userRoute);
app.use("/",index);


app.get("/", function(req,res){
    res.redirect("/products/shop");
});


app.listen(3000);