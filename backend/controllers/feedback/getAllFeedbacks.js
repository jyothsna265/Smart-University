var Feedback = require('../../models/feedback').Feedback;

function getAllFeedbacks(req, res){
    console.log("get all getAllFeedbacks");
    console.log(req.body.coursecode);
    Feedback.find({coursecode: req.body.coursecode}, (err, docs)=> {
      if(err){
        console.log("Err: " + err);
        res.status(400).send("Error occured!");
      }
      console.log("Success");
      //console.log("docs: ", docs);
      res.status(200).send(docs);
  });
}

module.exports = {
    getAllFeedbacks
}