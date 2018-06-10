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



/************************ Get video comments ************************/
router.get("/single-video/:movieNo/comments", function(req, res, next){

    var movieNo = req.params.movieNo;


    var sQuery = "SELECT c.comment, c.date_time_posted, u.email FROM video AS v" +
        " JOIN comment AS c ON v.video_uid = c.video_uid" +
        " JOIN user AS u ON c.user_uid = u.user_uid" +
        " WHERE c.video_uid = ?";

    // var sQuery = "SELECT c.comment, c.date_time_posted, u.email FROM video AS v" +
    //     " JOIN comment AS c ON v.video_uid = c.video_uid" +
    //     " JOIN user AS u" +
    //     " WHERE c.video_uid = ?";
    dbController.query(sQuery, [movieNo], (err, jData) => {
        if(err){
            console.log("err",err);
            return res.send(err);
        }
        console.log(jData);
        return res.send(jData);
    });
});

// Get a specific video by movie id
router.get("/single-video/:movieId", function(req,res,next){

    var movieNo = req.params.movieId;
    console.log("movieNo: ", movieNo);
    var sQuery = "select * from video WHERE video_uid = ?";

    dbController.query(sQuery, [movieNo], (err, sjData) => {
        console.log("fucking err", err);
        if(err){

            return res.send(JSON.stringify(err));
        }
        console.log("sjData", sjData);
        return res.send(sjData);
    });

});
module.exports = router;