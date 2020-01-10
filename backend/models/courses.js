const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
//const passportLocalMongoose = require('passport-local-mongoose');
autoIncrement.initialize(mongoose.connection);

mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

const courseSchema = new Schema({
  courseid: String, 
  name: String, 
  keyword: String,
  category: String,
  type: String,

});


const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
