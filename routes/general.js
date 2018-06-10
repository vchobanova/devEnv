/************************Packages***********************/
const express = require("express");
const router = express.Router();
/*******************************************************/

/************************Modules************************/
const dbController = require("../databaseaccesslayer/dbcontroller.js");
const hasher = require("../helpers/hasher.js");
/******************************************************/


router.get("/search/:title", function(req, res, next){
    if(req.session != null & req.session.isLoggedIn == true){
        var sQuery = "SELECT * FROM video WHERE title LIKE ?";
        var title = "%" + req.params.title + "%";
        dbController.query(sQuery, [title], (err, jData)=> {
            if(err){
                console.log(jData);
                res.status(500);
                return res.send(JSON.stringify({response: "Something went wrong!"}))
            } else {
                res.status(200);
                return res.send(jData);
            }
        });
    } else {
        res.status(401);
        return res.send(JSON.stringify({response: "You need to be logged in!"}));
    }
    
});

router.get("/", function(req, res, next){
    if(req.session != null & req.session.isLoggedIn == true){
        var sQuery = "SELECT * FROM video";
        dbController.query(sQuery, [], (err, jData)=> {
            if(err){
                console.log(jData);
                res.status(500);
                return res.send(JSON.stringify({response: "Something went wrong!"}))
            } else {
                res.status(200);
                return res.send(jData);
            }
        });
    } else {
        res.status(401);
        return res.send(JSON.stringify({response: "You need to be logged in!"}));
    }
});

router.get("/:genre", function(req, res, next){
    if(req.session != null & req.session.isLoggedIn == true){
        var sQuery = "SELECT * FROM video WHERE genre = ?";
        var title = req.params.genre;
        dbController.query(sQuery, [title], (err, jData)=> {
            if(err){
                console.log(jData);
                res.status(500);
                return res.send(JSON.stringify({response: "Something went wrong!"}))
            } else {
                res.status(200);
                return res.send(jData);
            }
        });
    } else {
        res.status(401);
        return res.send(JSON.stringify({response: "You need to be logged in!"}));
    }
});
module.exports = router;