var Job = require('../../models/job').Job;

function deleteJob(req, res){
    Job.deleteOne({reqId: req.query.reqId}, (err)=>{
      if(err){
        console.log("Err: " + err);
        res.status(400).send("Error occured!");
      }
      res.status(200).send("Delete successful!");
  })
}

module.exports = {
  deleteJob
}