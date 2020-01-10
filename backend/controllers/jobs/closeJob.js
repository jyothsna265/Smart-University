var Job = require('../../models/job').Job;

function closeJob(req, res){
    var query = {
      reqId: req.body.reqId
    };

    var update = {
      isActive: false
    }

    Job.findOneAndUpdate(query, update, (err, docs)=>{
      if(err){
        console.log("Err: " + err);
        res.status(400).send("Error occured!");
      }
      res.status(200).send("Job is closed");
  });
  
}

module.exports = {
  closeJob
};