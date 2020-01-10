var Job = require('../../models/job').Job;

function getAppliedJobs(req, res){
    console.log("get all jobs");
    let email = req.query.emailid;
    console.log("Applied JObs: " + JSON.stringify(email));
    Job.find({isActive: true, 'applications.emailId' : email}, (err, appliedJobs)=> {
        if(err){
            console.log("Err: " + err);
            res.status(400).send("Error occured!: " + err);
        }
        console.log(appliedJobs);
        res.status(200).send(appliedJobs);
    });
}


module.exports = {
    getAppliedJobs
}