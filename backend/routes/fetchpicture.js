const express = require('express')
const router = express.Router()
var User = require('../models/users');

router.get("/fetchpicture", function (req, res) {
    console.log("Inside fetchpicture: ", req.query.id);
    const emailID = req.query.id;

    User.findOne({ emailID: emailID })
        .then(result => {

            let output = {
                dbprofilepic: result.profilepic,
                dbaboutme: result.aboutme,
                dbaddress: result.address,
                dbprogram: result.program,
                dbmajor: result.major,
                dblanguages: result.languages,
                dbgender: result.gender,
                dbphonenum: result.phonenum,
                dbcompany: result.company,
                dbjobdesc: result.jobdesc
            }
            console.log("output", output);
            res.status(200).send(output);

        })
})

module.exports = router;

