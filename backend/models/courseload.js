var mongoose = require('mongoose');

var Courseload = mongoose.model('Courseload', {
    coursecode: {
        type: String
    },
    profname: {
        type: String
    },
    veryheavyctr: {
        type: Number,
        default: 0
    },
    heavyctr: {
        type: Number,
        default: 0
    },
    moderatectr: {
        type: Number,
        default: 0
    },
    load: {
        type: String
    }
});

module.exports = {
    Courseload
  };
  