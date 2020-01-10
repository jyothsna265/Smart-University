
const express = require('express')
const router = express.Router()

//Photo upload
const AWS = require("aws-sdk");
const fs = require("fs");
const fileType = require("file-type");
const bluebird = require("bluebird");
const multiparty = require("multiparty");
var User = require('../models/users');
var upload = require('../services/uploadService');
const singleUpload = upload.single('file');



router.post("/fileupload", (request, response) => {

  singleUpload(request, response, function (err) {

    if (err) {
      //console.log("ERROR!!!! " + err);
      return res.status(422).send({ errors: [{ title: 'File Upload Error', detail: err.message }] });
    } else {
      //console.log("request.body.emailID: ", request.body.emailID);
      const fileURL = request.file.location;
      //console.log("fileURL", fileURL);
      User.findOneAndUpdate({ emailID: request.body.emailID }, { $set: { profilepic: fileURL } }, function (err, doc) {
        if (err) {
          //console.log("Something wrong when updating data!");
          return response.status(400).send("Error occured!");
        } else {
          //console.log("........", response.send(fileURL));
          response.status(200).send(fileURL);
        }
      })
    }

  })

});




module.exports = router;
