var Job = require('../../models/job').Job;


function getAllApplications(req, res) {
    Job.findOne({reqId: req.query.reqId}, (err, doc) => {
      if(err){
        console.log("Err: " + err);
        res.status(400).send("Error occured!");
      }
      console.log("Success");
      console.log("docs: ", doc);
      res.status(200).send(doc.applications);
    })
}

module.exports = {
  getAllApplications
};
