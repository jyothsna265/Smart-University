var Job = require('../../models/job').Job ;

function getJob(req, res){
    Job.findOne({reqId: req.query.reqId}).then((docs)=>{
      if(docs){
        res.status(200).send(docs);
      } else {
        res.status(404).send("No data exists for this reqId.");
      }
  }).catch((err)=>{
      console.log("Err: " + err);
    res.status(400).send("Error occured!");
  })
  }

module.exports = {
  getJob
}