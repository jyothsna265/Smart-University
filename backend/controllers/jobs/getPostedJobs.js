var Job = require('../../models/job').Job ;

function getPostedJobs(req, res){
  console.log("Get Posted Jobs hit!")
    Job.find({postedBy: req.query.postedBy}).then((docs)=>{
      if(docs){
        res.status(200).send(docs);
      } else {
        res.status(404).send("No data exists.");
      }
  }).catch((err)=>{
      console.log("Err: " + err);
    res.status(400).send("Error occured!");
  })
  }

module.exports = {
  getPostedJobs
}