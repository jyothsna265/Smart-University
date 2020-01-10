var mongoose = require('mongoose');

var Feedback = mongoose.model('Feedback', {
    coursecode: {
        type: String
    },
    coursename: {
        type: String
    },
    profname: {
        type: String
    },
    rating: {
        type: String
    },
    difficultylevel: {
        type: String
    },
    grade: {
        type: String
    },
    describe: {
        type: String
    },
    proffeedback: {
        type: String
    },
    dateoffeedback: {
        type: String
    }
});

module.exports = {
    Feedback
  };
  