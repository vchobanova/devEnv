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
const general = require(__dirname + "/routes/general.js");
/****************************************************/

/***********************Routes***********************/
app.use("/account", user);
app.use("/movie", movie);
app.use("/tv-program", tvprogram);
app.use("/tv", general);
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
    sBottomHtml = sBottomHtml.replace('{{customScript}}',  '<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.form/4.2.2/jquery.form.min.js"></script>' +'<script src="../public/javascript/login.js"></script>');
    res.send( sTopHtml + sMainHtml + sBottomHtml );
    res.end();
});
/***********************Views***********************/
app.get("/home", (req, res) => {
    if(req.session != null & req.session.isLoggedIn == true){
        var sTopHtml = fs.readFileSync( __dirname + '/public/components/top.html', 'utf8' );
        var sNavHtml = fs.readFileSync( __dirname + '/public/components/nav.html', 'utf8' );
        var sMainHtml = fs.readFileSync( __dirname + '/views/home.html', 'utf8' );
        var sFooterHtml = fs.readFileSync( __dirname + '/public/components/footer.html', 'utf8' );
        var sBottomHtml = fs.readFileSync( __dirname + '/public/components/bottom.html', 'utf8' );

        //replace placeholders
        sTopHtml = sTopHtml.replace('{{title}}','Home page');
        sTopHtml = sTopHtml.replace('{{customcss}}', '<link rel="stylesheet" href="../public/css/menu.css">');
        //sNavHtml = sTopHtml.replace('{{active-home}}',' active');
        //sNavHtml = sTopHtml.replace(/{{active-.*}}/g ,'');
        sBottomHtml = sBottomHtml.replace('{{customScript}}',  '<script src="../public/javascript/home.js"></script>'+ 
        '<script src="../public/javascript/searchGeneral.js"></script>' + '<script src="../public/javascript/logout.js"></script>');
        res.status(200);
        return res.send( sTopHtml + sNavHtml + sMainHtml + sFooterHtml + sBottomHtml );
    } else {
        res.status(401);
        return res.redirect("/");
    }

});

app.get("/register", (req, res) => {
    var sTopHtml = fs.readFileSync( __dirname + '/public/components/top.html', 'utf8' );
    var sMainHtml = fs.readFileSync( __dirname + '/views/register.html', 'utf8' );
    var sBottomHtml = fs.readFileSync( __dirname + '/public/components/bottom.html', 'utf8' );

    //replace placeholders
    sTopHtml = sTopHtml.replace('{{title}}','Netflix 2.0');
    sTopHtml = sTopHtml.replace('{{active-home}}',' active');
    sTopHtml = sTopHtml.replace(/{{active-.*}}/g ,'');
    sTopHtml = sTopHtml.replace('{{customcss}}', '<link rel="stylesheet" href="../public/css/register.css">');
    sBottomHtml = sBottomHtml.replace('{{customScript}}',  '<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.form/4.2.2/jquery.form.min.js"></script>' +'<script src="../public/javascript/register.js"></script>');
    res.send( sTopHtml + sMainHtml + sBottomHtml );
    res.end();
});

app.get("/movies", (req, res) => {
    if(req.session != null & req.session.isLoggedIn == true){
        var sTopHtml = fs.readFileSync( __dirname + '/public/components/top.html', 'utf8' );
        var sNavHtml = fs.readFileSync( __dirname + '/public/components/nav.html', 'utf8' );
        var sMainHtml = fs.readFileSync( __dirname + '/views/movie.html', 'utf8' );
        var sFooterHtml = fs.readFileSync( __dirname + '/public/components/footer.html', 'utf8' );
        var sBottomHtml = fs.readFileSync( __dirname + '/public/components/bottom.html', 'utf8' );

        //replace placeholders
        sTopHtml = sTopHtml.replace('{{title}}','Movies');
        sTopHtml = sTopHtml.replace('{{customcss}}', '<link rel="stylesheet" href="../public/css/menu.css">');
        //sNavHtml = sTopHtml.replace('{{active-home}}',' active');
        //sNavHtml = sTopHtml.replace(/{{active-.*}}/g ,'');
        sBottomHtml = sBottomHtml.replace('{{customScript}}',  '<script src="../public/javascript/movies.js"></script>' + 
        '<script src="../public/javascript/searchMovies.js"></script>' + '<script src="../public/javascript/logout.js"></script>');
        res.status(200);
        return res.send( sTopHtml + sNavHtml + sMainHtml + sFooterHtml + sBottomHtml );
    } else {
        res.status(401);
        return res.redirect("/");
    }
});

app.get("/tv-programs", (req, res) => {
    if(req.session != null & req.session.isLoggedIn == true){
        var sTopHtml = fs.readFileSync( __dirname + '/public/components/top.html', 'utf8' );
        var sNavHtml = fs.readFileSync( __dirname + '/public/components/nav.html', 'utf8' );
        var sMainHtml = fs.readFileSync( __dirname + '/views/tvprogram.html', 'utf8' );
        var sFooterHtml = fs.readFileSync( __dirname + '/public/components/footer.html', 'utf8' );
        var sBottomHtml = fs.readFileSync( __dirname + '/public/components/bottom.html', 'utf8' );

        //replace placeholders
        sTopHtml = sTopHtml.replace('{{title}}','Tv-programs');
        sTopHtml = sTopHtml.replace('{{customcss}}', '<link rel="stylesheet" href="../public/css/menu.css">');
        //sNavHtml = sTopHtml.replace('{{active-home}}',' active');
        //sNavHtml = sTopHtml.replace(/{{active-.*}}/g ,'');
        sBottomHtml = sBottomHtml.replace('{{customScript}}',  '<script src="../public/javascript/tvprogram.js"></script>' +
        '<script src="../public/javascript/searchTvProgram.js"></script>' + '<script src="../public/javascript/logout.js"></script>');
        res.status(200);
        return res.send( sTopHtml + sNavHtml + sMainHtml + sFooterHtml + sBottomHtml );
    } else {
        res.status(401);
        return res.redirect("/");
    }
});

app.get("/profile", (req, res) => {
    if(req.session != null & req.session.isLoggedIn == true){
        var sTopHtml = fs.readFileSync( __dirname + '/public/components/top.html', 'utf8' );
        var sNavHtml = fs.readFileSync( __dirname + '/public/components/navuser.html', 'utf8' );
        var sMainHtml = fs.readFileSync( __dirname + '/views/profile.html', 'utf8' );
        var sFooterHtml = fs.readFileSync( __dirname + '/public/components/footer.html', 'utf8' );
        var sBottomHtml = fs.readFileSync( __dirname + '/public/components/bottom.html', 'utf8' );

        //replace placeholders
        sTopHtml = sTopHtml.replace('{{title}}','Profile');
        sTopHtml = sTopHtml.replace('{{customcss}}', '<link rel="stylesheet" href="../public/css/menu.css">');
        sMainHtml = sMainHtml.replace("{{user}}", req.session.name);
        //sNavHtml = sTopHtml.replace('{{active-home}}',' active');
        //sNavHtml = sTopHtml.replace(/{{active-.*}}/g ,'');
        sBottomHtml = sBottomHtml.replace('{{customScript}}',  '<script src="../public/javascript/profile.js"></script>' +
         '<script src="../public/javascript/logout.js"></script>');
        res.status(200);
        return res.send( sTopHtml + sNavHtml + sMainHtml + sFooterHtml + sBottomHtml );
    } else {
        res.status(401);
        return res.redirect("/");
    }
});

app.get("/single-video/:UID", (req, res) => {

    var sTopHtml = fs.readFileSync( __dirname + '/public/components/top.html', 'utf8' );
    var sNavHtml = fs.readFileSync( __dirname + '/public/components/nav.html', 'utf8' );
    var sMainHtml = fs.readFileSync( __dirname + '/views/single-video.html', 'utf8' );
    var sFooterHtml = fs.readFileSync( __dirname + '/public/components/footer.html', 'utf8' );
    var sBottomHtml = fs.readFileSync( __dirname + '/public/components/bottom.html', 'utf8' );

    sTopHtml = sTopHtml.replace('{{title}}','Single video');
    sTopHtml = sTopHtml.replace('{{customcss}}', '<link rel="stylesheet" href="../public/css/menu.css">' + '<link rel="stylesheet" href="../public/css/single-video.css">' + '<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">'); 

    sBottomHtml = sBottomHtml.replace('{{customScript}}',  '<script src="../public/javascript/single-video.js"></script>');
    res.send( sTopHtml + sNavHtml + sMainHtml + sFooterHtml + sBottomHtml );
    res.end();

});

app.listen(8080, (err) => {
    if(err) return err;
    console.log("server has started on port: *8080");
});