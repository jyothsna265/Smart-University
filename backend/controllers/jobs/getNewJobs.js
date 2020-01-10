var Job = require('../../models/job').Job;

function getNewJobs(req, res){
    console.log("get all jobs");
    let email = req.body.emailId;

    Job.find({isActive: true}, (err, allJobs)=> {
      if(err){
        console.log("Err: " + err);
        res.status(400).send("Error occured!: " + err);
      }
      Job.find({isActive: true, 'applications.emailId' : email}, (err, appliedJobs)=> {
        if(err){
          console.log("Err: " + err);
          res.status(400).send("Error occured!: " + err);
        }
        let difference = allJobs.filter(x => !appliedJobs.includes(x));
        res.status(200).send(difference);
      });
    });
}


module.exports = {
  getNewJobs
}