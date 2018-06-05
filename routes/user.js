/************************Packages***********************/
const express = require("express");
const router = express.Router();
/*******************************************************/

/************************Modules************************/
const dbController = require("../databaseaccesslayer/dbcontroller.js");
const hasher = require("../helpers/hasher.js");
/******************************************************/


router.post("/register", function(req, res, next){
    var user_uid = null;
    var email = req.body.email;
    var name = req.body.name;
    var password = req.body.password;
    var role = "Basic";
    var hashResult = hasher.hashPw(password);
    var pwSalt = hashResult.salt;
    var pwHashSalt = hashResult.data.pwHash;


    var sp = "call AddUpdateUser(?, ?, ?, ?, ?, ?)";
    dbController.query(sp, [user_uid, email, name, pwSalt, pwHashSalt, role], (err, jData) => {
        if(err){
            console.log(jData);
            res.status(500);
            res.send(JSON.stringify({response: "Something went wrong!"}));
        } else {
            res.status(200);
            console.log(jData);
            return res.send(JSON.stringify({response: "Successfully registered!"}));
        }
    });
    
});

router.post("/login", function(req, res, next){
    var email = req.body.email;
    var password = req.body.password;

    var sQuery = "SELECT u.user_uid, u.email, u.name, u.password_salt, u.password, ur.user_role_name FROM user AS u" + 
                 " JOIN user_role as ur" + 
                 " ON u.user_role_uid = ur.user_role_uid"
                 " WHERE email = ?";
    dbController.query(sQuery, [email], (err, jData) => {
        if(err){
            console.log(jData);
            res.status(500);
            res.send(JSON.stringify({response: "Something went wrong!"}))
        } else {
            if(jData.length > 0){
                var dbSalt = jData[0].password_salt;
                var dbHash = jData[0].password;
                console.log(password)
                var jResult = hasher.verifyPw(password, dbSalt, dbHash);
                if(jResult.status == false){
                    res.status(401);
                    return res.send(JSON.stringify({response: "Username or password is incorrect"}));
                } else {
                    console.log(jData[0]);
                    req.session.isLoggedIn = true;
                    req.session.user_uid = jData[0].user_uid;
                    req.session.name = jData[0].name;
                    req.session.user_role = jData[0].user_role_name;
                    res.status(200);
                    return res.send(req.session);
                }
            } else {
                res.status(401);
                res.send(JSON.stringify({response: "User not found!"}))
            }
          
        }
    });
});

router.get("/logout", function(req, res, next){
    req.session.destroy();
    res.status(200);
    return res.send(JSON.stringify({response: "Successfully logged out!"}));
});

router.post("/comment", function(req, res, next){

    var commentNo = null;
    var user_uid = req.body.userNo;
    var comment = req.body.comment;
    var video_uid = req.body.movieId;
    var sp = "call AddUpdateComment(?, ?, ?, ?)";
    dbController.query(sp, [commentNo, comment, user_uid, video_uid], (err, jData) => {
        console.log("jData: ", jData);
        if(err){
            console.log(err);
            return res.send(err);
        }

        console.log(jData);
        return res.send(jData);
    });

});
module.exports = router;
