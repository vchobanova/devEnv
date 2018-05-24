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




/***********************Modules**********************/
const user = require(__dirname + "/routes/user.js");
/****************************************************/

/***********************Routes***********************/
app.use("/account", user);
/****************************************************/

/***********************Views***********************/
app.get("/", (req, res) => {
    var sTopHtml = fs.readFileSync( __dirname + '/public/components/top.html', 'utf8' );
    var sMainHtml = fs.readFileSync( __dirname + '/views/index.html', 'utf8' );
    var sBottomHtml = fs.readFileSync( __dirname + '/public/components/bottom.html', 'utf8' );

    //replace placeholders
    sTopHtml = sTopHtml.replace('{{title}}','Web shop home page');
    sTopHtml = sTopHtml.replace('{{active-home}}',' active');
    sTopHtml = sTopHtml.replace(/{{active-.*}}/g ,'');
    sBottomHtml = sBottomHtml.replace('{{customScript}}',  '<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.form/4.2.2/jquery.form.min.js"></script>' +
        '<script src="../public/javascript/general.js"></script>' +
        '<script src="../public/javascript/login.js"></script>' +
        '<script src="../public/javascript/logout.js"></script>' +
        '<script src="../public/javascript/register.js"></script>' +
        '<script src="../public/javascript/homePage.js"></script>');
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