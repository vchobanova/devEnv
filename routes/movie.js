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
    // if(req.session != null & req.session.isLoggedIn == true){
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
    // } else {
    //     res.status(401);
    //     return res.send(JSON.stringify({response: "You need to be logged in!"}));
    // }
});

// Get a specific movie by movie id
router.get("/:movieNo", function(req,res,next){

    var movieNo = req.params.movieNo;
    var sQuery = "select * from video WHERE video_uid = ?";

    dbController.query(sQuery, [movieNo], (err, sjData) => {
        if(err){
            console.log(err);
            return res.send(JSON.stringify(err));
        }
        console.log(sjData);
        return res.send(sjData);
    });

});


/************************ Get video comments ************************/
router.get("/:movieNo/comments", function(req, res, next){

    var movieNo = req.params.movieNo;

    //
    // var sQuery = "SELECT c.comment, c.date_time_posted, u.email FROM video AS v" +
    //     " JOIN comment AS c ON v.video_uid = c.video_uid" +
    //     " JOIN user AS u ON c.user_uid = u.user_uid" +
    //     " WHERE c.video_uid = ?";
    //
    var sQuery = "SELECT c.comment, c.date_time_posted, u.email FROM video AS v" +
        " JOIN comment AS c ON v.video_uid = c.video_uid" +
        " JOIN user AS u" +
        " WHERE c.video_uid = ?";
    dbController.query(sQuery, [movieNo], (err, jData) => {
        if(err){
            console.log("err",err);
            return res.send(err);
        }
        console.log(jData);
        return res.send(jData);
    });
});



module.exports = router;