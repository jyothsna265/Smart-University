var Job = require('../../models/job').Job;

function postJob(req, res){
    console.log("postJob");
      var newJob =  new Job({
        company: req.body.company,
        title: req.body.title,
        reqId: req.body.reqId,
        description: req.body.description,
        requirements: req.body.requirements,
        empType: req.body.empType,
        duration: req.body.duration,
        location: req.body.location,
        isActive: true,
        isApplied: false,
        postedBy: req.body.emailId
      });
      newJob.save().then(()=>{
        res.send("Successful").status(201);
      }).catch((err)=>{
        if(err){
          console.log("Err: " + err);
          res.status(400).send("Error occured!");
        }
      });
    }

module.exports = {
  postJob
};