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

    var sQuery = "SELECT * FROM user WHERE email = ?";
    dbController.query(sQuery, [email], (err, jData) => {
        if(err){
            console.log(jData);
            res.status(500);
            res.send(JSON.stringify({response: "Something went wrong!"}))
        } else {
            var dbSalt = jData[0].password_salt;
            var dbHash = jData[0].password;

            var jResult = hasher.verifyPw(password, dbSalt, dbHash);
            if(jResult.status == false){
                res.status(401);
                return res.send(JSON.stringify({response: "Username or password is incorrect"}));
            } else {
                req.session.isLoggedIn = true;
                req.session.user_uid = jData[0].user_uid;
                req.session.email = jData[0].email;
            }
        }
    });
});

module.exports = router;
