const express = require("express");
const body_parser = require("body-parser");
const appSettings = require(__dirname + "/appSettings.json");
var session = require("express-session");
var cookieParser = require("cookie-parser");
const sessionSecret = appSettings.appSecrets.session_secret;
const fs = require("fs");


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

/***********************Views***********************/
app.get("/", (req, res) => {
    var sTopHtml = fs.readFileSync( __dirname + '/public/components/top.html', 'utf8' );
    var sMainHtml = fs.readFileSync( __dirname + '/views/login.html', 'utf8' );
    var sBottomHtml = fs.readFileSync( __dirname + '/public/components/bottom.html', 'utf8' );

    //replace placeholders
    sTopHtml = sTopHtml.replace('{{title}}','Netflix 2.0');
    sTopHtml = sTopHtml.replace('{{active-home}}',' active');
    sTopHtml = sTopHtml.replace(/{{active-.*}}/g ,'');
    sTopHtml = sTopHtml.replace('{{customcss}}', '<link rel="stylesheet" href="../public/css/login.css">');
    sBottomHtml = sBottomHtml.replace('{{customScript}}',  '<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.form/4.2.2/jquery.form.min.js"></script>');
    res.send( sTopHtml + sMainHtml + sBottomHtml );
    res.end();
});
/***********************Views***********************/
app.get("/", (req, res) => {
    var sTopHtml = fs.readFileSync( __dirname + '/public/components/top.html', 'utf8' );
    var sMainHtml = fs.readFileSync( __dirname + '/views/login.html', 'utf8' );
    var sBottomHtml = fs.readFileSync( __dirname + '/public/components/bottom.html', 'utf8' );

    //replace placeholders
    sTopHtml = sTopHtml.replace('{{title}}','Login page');

    sBottomHtml = sBottomHtml.replace('{{customScript}}',  '<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.form/4.2.2/jquery.form.min.js"></script>' +
        '<script src="../public/javascript/login.js"></script>' +
        '<script src="../public/javascript/register.js"></script>');
    res.send( sTopHtml + sMainHtml + sBottomHtml );
    res.end();
});



app.listen(8080, (err) => {
    if(err) return err;
    console.log("server has started on port: *8080");
});