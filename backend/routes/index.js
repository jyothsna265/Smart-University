var express = require('express');
var router = express.Router();

var getNewJobsCntlr = require('../controllers/jobs/getNewJobs');
var getAppliedJobsCntlr = require('../controllers/jobs/getAppliedJobs');
var getPostedJobsCntlr = require('../controllers/jobs/getPostedJobs');
var getJobCntlr = require('../controllers/jobs/getJob');
var postJobCntlr = require('../controllers/jobs/postJob');
var closeJobCntlr = require('../controllers/jobs/closeJob');
var deleteJobCntlr = require('../controllers/jobs/deleteJob');
var applyCntlr = require('../controllers/applications/upload');
var getAllApplicationsCntlr = require('../controllers/applications/getAllApplications');
var postFeedbackCntlr = require('../controllers/feedback/postFeedback');
var getAllFeedbacksCntlr = require('../controllers/feedback/getAllFeedbacks');
var alumniPostJobCntlr = require('../controllers/jobs/alumniPostJob');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('Server is alive! 1.0');
});

/**
 * CRUD oprations on Jobs
 */

router.get('/newjobs', function (req, res) {
    getNewJobsCntlr.getNewJobs(req, res);
});

router.get('/postedjobs', function (req, res) {
    getPostedJobsCntlr.getPostedJobs(req, res);
});

router.get('/appliedjobs', function (req, res) {
    getAppliedJobsCntlr.getAppliedJobs(req, res);
});

router.get('/job', function (req, res) {
    getJobCntlr.getJob(req, res);
});

router.post('/job', function (req, res) {
    postJobCntlr.postJob(req, res);
});

router.put('/job', function (req, res) {
    closeJobCntlr.closeJob(req, res);
});

router.delete('/job', function (req, res) {
    deleteJobCntlr.deleteJob(req, res);
});

/**
 * CRUD operations on Applications
 */

router.post('/apply', function (req, res) {
    applyCntlr.applyToJob(req, res);
});

router.get('/applications', function (req, res) {
    getAllApplicationsCntlr.getAllApplications(req, res);
});

// router.delete('/withdraw', function (req, res) {
//     applyToJobCntlr.applyToJob(req, res);
// });

/**
 * CRUD operations on Feedback
 */

router.post('/postfeedback', function (req, res) {
    postFeedbackCntlr.postFeedback(req, res);
});

console.log("outside viewfeedback")
router.post('/viewfeedback', function (req, res) {
    console.log("Inside viewfeedback")
    getAllFeedbacksCntlr.getAllFeedbacks(req, res);
});

router.post('/alumnipostjob', function(req, res) {
    alumniPostJobCntlr.alumniPostJob(req, res);
})

module.exports = router;
