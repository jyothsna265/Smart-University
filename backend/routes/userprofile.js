const express = require('express')
const router = express.Router();
var User = require('../models/users');
const jwt = require('jsonwebtoken');
var crypt = require('../bcrypt/crypto');
var bcrypt = require('bcrypt');

router.post("/userprofile", function (req, res) {

    console.log("Inside UserProfile Request at Backend")
    let msg = req.body;
    let data = msg;
    User.findOne({ emailID: data.emailID, type: data.type })
        .then(user => {
            const body = { emailID: data.emailID };

            User.findOneAndUpdate({ emailID: data.emailID }, { $set: { address: data.address, program: data.program, jobdesc: data.jobdesc, company: data.company, major: data.major, languages: data.languages, gender: data.gender, aboutme: data.aboutme, phonenum: data.phonenum } }, function (err, doc) {
                if (err) {
                    console.log("Something wrong when updating data!");
                }

                console.log(doc);
            });



        })
        .catch(err => {
            console.log("last error");
        })

})





module.exports = router;