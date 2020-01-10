const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
var User = require('../models/users');

var bcrypt = require('bcrypt');


router.post("/signin", function(req, res) {
    console.log("Inside Log in Request at Backend");
    let data = req.body;
User.findOne({emailID: data.emailID})     //,type: data.type
  .then(user => {
    if(!user) {
        console.log("Inside err");
        res.sendStatus(401).end("Wrong username/password");
        return;		
    }
        bcrypt.compare(data.password, user.password)
            .then(function(result) { 
            if (result === true) {
                const body = { emailID : user.emailID };
                //Sign the JWT token and populate the payload with the user email and id
                const token = jwt.sign({ body : body },'smartuniversity');
                let output = {
                    token:token,
                    "emailID":user.emailID,
                    "firstname": user.firstname,
                    "lastname":user.lastname,
                    "type":user.type,
                  }
                console.log("User logged in successfully", output);
                console.log(req.session.id)
                req.session.user = output;
                req.session.save(); 
                res.end(JSON.stringify(req.session.user));
            } else  {
                console.log("Inside err");
                res.sendStatus(401).end("Wrong username/password");            }
            })
            .catch(err=>{
                console.log("Inside err in catch");
                res.sendStatus(401).end("Wrong username/password");                return;
            })
        })
        .catch(err => {
            console.log("Inside err in final catch");
            res.sendStatus(401).end("Wrong username/password");        }
)
                
})



router.get('/session',function(req, res){

    console.log("===============>",req.session.id);
    console.log(req.session.user)

    res.json(req.session.user);
    res.end();
})

router.post("/logout", function(req, res) {
    console.log("Inside Logout Route at server")
    req.session.user = '';
    req.session.destroy();
    res.end();
})

module.exports = router;