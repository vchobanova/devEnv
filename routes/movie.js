/************************Packages***********************/
const express = require("express");
const router = express.Router();
/*******************************************************/

/************************Modules************************/
const dbController = require("../databaseaccesslayer/dbcontroller.js");
const hasher = require("../helpers/hasher.js");
/******************************************************/


router.get("/", function(req, res, next){
    console.log(req.session);
    if(req.session != null & req.session.isLoggedIn == true){
        var sQuery = "SELECT * FROM video WHERE type = ?";
        var type = "Movie";
        dbController.query(sQuery, [type], (err, jData)=> {
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