const express = require("express");
const body_parser = require("body-parser");
const appSettings = require(__dirname + "/appSettings.json");
var session = require("express-session");
var cookieParser = require("cookie-parser");
const sessionSecret = appSettings.appSecrets.session_secret;


var app = express();
if (app.get('env') === 'production') {
    app.set('trust proxy', 1); // trust first proxy
    sess.cookie.secure = true // serve secure cookies
  }
app.use(cookieParser());
//to-do set cookie: {secure: true} when u implement https
app.use(session({ 
    "secret": sessionSecret, 
    "saveUninitialized":false, 
    "resave":false,
    cookie: {httpOnly: true}}));
app.use(body_parser.json());
app.use(body_parser.urlencoded({"extended":true}));
app.use("/public", express.static("public"));


/***********************Modules**********************/
const user = require(__dirname + "/routes/user.js");
const movie = require(__dirname + "/routes/movie.js");
const tvprogram = require(__dirname + "/routes/tvprogram.js");
/****************************************************/

/***********************Routes***********************/
app.use("/account", user);
app.use("/movie", movie);
app.use("/tv-program", tvprogram);
/****************************************************/





app.listen(8080, (err) => {
    if(err) return err;
    console.log("server has started on port: *8080");
});