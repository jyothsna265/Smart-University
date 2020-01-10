const express = require('express')
const router = express.Router();
var User = require('../models/users');
const jwt = require('jsonwebtoken');
var crypt = require('../bcrypt/crypto');
var bcrypt = require('bcrypt');

router.post("/signup", function(req, res) {

    console.log("Inside Sign Up Request at Backend")
    let msg = req.body;
    let data = msg;
    User.findOne({emailID: data.emailID ,type: data.type})
    .then(user => {
        if(user) {
            console.log("Inside err");
            res.sendStatus(401).end("Email ID already exists");  	
        }
        const body = { emailID : data.emailID };
        //Sign the JWT token and populate the payload with the user email and id
        const token = jwt.sign({ user : body },'feedbackportal');
        //Send back the token to the user  
    User.create({ emailID:msg.emailID, password:msg.password, firstname:msg.firstname,lastname:msg.lastname,fullname:msg.fullname,type:msg.type })
    .then(response=>{
        let output = {
          token:token,
          "emailID":data.emailID,
          "firstname": data.firstname,
          "lastname":data.lastname,
          "fullname":data.fullname,
          "type":data.type
            }
        console.log("User signed up successfully", output);
        console.log(req.session.id)
        req.session.user = output;
        req.session.save();
        res.end(JSON.stringify(output));

    })
    .catch(err =>{
        console.log("Inside err");
        res.sendStatus(401).end("user details error");
        console.log("user error",err)

    })
})
.catch(err =>{
    console.log("last error");
})
    
})

module.exports = router;