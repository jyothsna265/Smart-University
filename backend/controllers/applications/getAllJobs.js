var Job = require('../../models/application').Job;


function getAllJobs(req, res) {
    Job.find({reqId: req.query.reqId}, (err, docs) => {
      if(err){
        console.log("Err: " + err);
        res.status(400).send("Error occured!");
      }
      console.log("Success");
      console.log("docs: ", docs);
      res.status(200).send(docs);
    })
}

module.exports = {
    getAllJobs
};
