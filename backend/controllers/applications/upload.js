var Job = require('../../models/job').Job;
var Application = require('../../models/application').Application;
var upload = require('../../services/uploadService');

const singleUpload = upload.single('file');

function applyToJob(req, res){
  console.log("1st body: ",  req.body);
  singleUpload(req, res, function(err){
    console.log("2nd body: ",  req.body);
    if (err) {
        console.log("ERROR!!!! " + err);
        return res.status(422).send({errors: [{title: 'File Upload Error', detail: err.message}] });
    } else {
      const fileURL = req.file.location;

  var newApplication = {
    applicant: req.body.applicant,
    emailId: req.body.emailID,
    resume: fileURL,
    appliedOn: new Date()
  }
   Job.findOneAndUpdate(
      {reqId: req.body.reqId}, 
      {$push : {
        applications: newApplication 
      }},
      {safe: true, upsert: false, new : true},
      function(err, model) {
        console.log("3st body: ",  req.body);
        console.log("3rd err", err)
        console.log("3rd model", model);
        if(err) {
          return res.status(400).send("Error occured!" + " " + err);
        }
        console.log("Succesful in upload");
        return res.status(200).send("Successful!");
      });
     }
  })
}


module.exports = {
    applyToJob
};