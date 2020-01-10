//import the require dependencies
var mongoose = require("mongoose");
// var mongo = require("mongodb");

var express = require("express");
var app = express();
// var bodyParser = require("req.body-parser");
var bodyParser = require("body-parser");
var session = require("express-session");
//var cookieParser = require('cookie-parser');
var morgan = require("morgan");
var cors = require("cors");

var path = require('path');

app.set("view engine", "ejs");
app.set("views", __dirname);
//use this line for allowing the frontend to connect to backend
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

var { mongoose } = require("./db/mongoose");
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);

mongoose.set("debug", true);

//Import the established routes
var routesIndex = require('./routes/index');
const signupRoutes = require("./routes/signup");
const signinRoutes = require("./routes/signin");
const searchRoutes = require("./routes/searchCourses");
const userprofRoutes = require("./routes/userprofile");
const fileuploadRoutes = require("./routes/fileupload");
const fetchpictureRoutes = require("./routes/fetchpicture");
const getProfessorRoutes = require("./routes/searchCourses");


//use express session to maintain session data
app.use(session({
  name: 'feedbackportal',
  secret: "0988787545854467997",
  resave: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  saveUninitialized: true
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function (req, res, next) {
  // do * to allow from any changed this line 
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

/**************Code goes here*******************/

app.use('/public', express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));
console.log("Main routes")
app.use('/', routesIndex);

app.post("/signup", signupRoutes);
app.post("/signin", signinRoutes);
app.get("/session", signinRoutes);
app.post("/logout", signinRoutes);
app.post("/searchCourses", searchRoutes);
app.post("/Userprofile", userprofRoutes);
//console.log("Before fileupload");
app.post("/fileupload", fileuploadRoutes);
app.get("/fetchpicture", fetchpictureRoutes);
//app.post("/saveimage", fileuploadRoutes);
app.get("/getProfessor", getProfessorRoutes);









// start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");

module.exports = app;
