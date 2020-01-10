var Feedback = require('../../models/feedback').Feedback;
var CourseLoad = require('../../models/courseload').Courseload;

function postFeedback(req, res) {
  console.log("Post Feedback");

  var newFeedback = new Feedback({
    coursecode: req.body.coursecode,
    coursename: req.body.coursename,
    profname: req.body.profname,
    courseload: req.body.courseload,
    grade: req.body.grade,
    proffeedback: req.body.proffeedback,
    dateoffeedback: req.body.dateoffeedback
  });
  newFeedback.save().then(() => {
    res.send("Successful").status(201);
  }).catch((err) => {
    if (err) {
      console.log("Err: " + err);
      res.status(400).send("Error occured!");
    }
  });

  var veryheavyctr;
  var heavyctr;
  var moderatectr;

  console.log(req.body.courseload);
  if (req.body.courseload == "Very Heavy") {
    console.log("in veryheavy")

    var newCourseLoad = {
      coursecode: req.body.coursecode,
      profname: req.body.profname,
      veryheavyctr: 1,
      heavyctr: 0,
      moderatectr: 0,
      load: req.body.courseload
    }
    CourseLoad.findOneAndUpdate(
      {
        coursecode: req.body.coursecode,
        profname: req.body.profname
      },
      {
        $push: {
          courseloads: newCourseLoad
        }
      },
      { safe: true, upsert: true, new: true },
      function (err, model) {
        if (err) {
          console.log("failure in find one", err)
          return res.status(400).send("Error occured!" + " " + err);
        }
        console.log("Sucess in find one")

        CourseLoad.find({ coursecode: req.body.coursecode, profname: req.body.profname }, (err, docs) => {
          console.log("Documents:", docs[0]);
          console.log("Documents: ", docs[0].veryheavyctr);
          veryheavyctr = Number(docs[0].veryheavyctr) + 1;
          heavyctr = Number(docs[0].heavyctr);
          moderatectr = Number(docs[0].moderatectr);
          console.log(veryheavyctr);
          CourseLoad.updateOne({ coursecode: req.body.coursecode, profname: req.body.profname }, { $set: { veryheavyctr: veryheavyctr } }, (err, docs) => {
            console.log(docs);
          })

          if (veryheavyctr > heavyctr && veryheavyctr > moderatectr) {
            CourseLoad.updateOne({ coursecode: req.body.coursecode, profname: req.body.profname }, { $set: { load: "Very Heavy" } }, (err, docs) => {
              console.log(docs);
            })
          }
          else if (heavyctr > veryheavyctr && heavyctr > moderatectr) {
            CourseLoad.updateOne({ coursecode: req.body.coursecode, profname: req.body.profname }, { $set: { load: "Heavy" } }, (err, docs) => {
              console.log(docs);
            })
          }
          else {
            CourseLoad.updateOne({ coursecode: req.body.coursecode, profname: req.body.profname }, { $set: { load: "Moderate" } }, (err, docs) => {
              console.log(docs);
            })
          }
        })
        return res.status(200).send("Successful!");
      })
  }

  else if (req.body.courseload == "Heavy") {
    console.log("in heavy")

    var newCourseLoad = {
      coursecode: req.body.coursecode,
      profname: req.body.profname,
      veryheavyctr: 0,
      heavyctr: 1,
      moderatectr: 0,
      load: req.body.courseload
    }
    CourseLoad.findOneAndUpdate(
      {
        coursecode: req.body.coursecode,
        profname: req.body.profname
      },
      {
        $push: {
          courseloads: newCourseLoad
        }
      },
      { safe: true, upsert: true, new: true },
      function (err, model) {
        if (err) {
          console.log("failure in find one", err)
          return res.status(400).send("Error occured!" + " " + err);
        }

        console.log("Sucess in find one")

        CourseLoad.find({ coursecode: req.body.coursecode, profname: req.body.profname }, (err, docs) => {
          console.log("Documents: ", docs[0].heavyctr);
          heavyctr = Number(docs[0].heavyctr) + 1;
          veryheavyctr = Number(docs[0].veryheavyctr);
          moderatectr = Number(docs[0].moderatectr);
          console.log(heavyctr);
          CourseLoad.updateOne({ coursecode: req.body.coursecode, profname: req.body.profname }, { $set: { heavyctr: heavyctr } }, (err, docs) => {
            console.log(docs);
          })

          if (veryheavyctr > heavyctr && veryheavyctr > moderatectr) {
            CourseLoad.updateOne({ coursecode: req.body.coursecode, profname: req.body.profname }, { $set: { load: "Very Heavy" } }, (err, docs) => {
              console.log(docs);
            })
          }
          else if (heavyctr > veryheavyctr && heavyctr > moderatectr) {
            CourseLoad.updateOne({ coursecode: req.body.coursecode, profname: req.body.profname }, { $set: { load: "Heavy" } }, (err, docs) => {
              console.log(docs);
            })
          }
          else {
            CourseLoad.updateOne({ coursecode: req.body.coursecode, profname: req.body.profname }, { $set: { load: "Moderate" } }, (err, docs) => {
              console.log(docs);
            })
          }
        })
        return res.status(200).send("Successful!");
      })
  }

  else if (req.body.courseload == "Moderate") {
    console.log("in Moderate")

    var newCourseLoad = {
      coursecode: req.body.coursecode,
      profname: req.body.profname,
      veryheavyctr: 0,
      heavyctr: 0,
      moderatectr: 1,
      load: req.body.courseload
    }
    CourseLoad.findOneAndUpdate(
      {
        coursecode: req.body.coursecode,
        profname: req.body.profname
      },
      {
        $push: {
          courseloads: newCourseLoad
        }
      },
      { safe: true, upsert: true, new: true },
      function (err, model) {
        if (err) {
          console.log("failure in find one", err)
          return res.status(400).send("Error occured!" + " " + err);
        }
        console.log("Sucess in find one")

        CourseLoad.find({ coursecode: req.body.coursecode, profname: req.body.profname }, (err, docs) => {
          console.log("Documents: ", docs[0].moderatectr);
          moderatectr = Number(docs[0].moderatectr) + 1;
          veryheavyctr = Number(docs[0].veryheavyctr);
          heavyctr = Number(docs[0].heavyctr);
          console.log(moderatectr);
          CourseLoad.updateOne({ coursecode: req.body.coursecode, profname: req.body.profname }, { $set: { moderatectr: moderatectr } }, (err, docs) => {
            console.log(docs);
          })

          console.log("Counter data: ", veryheavyctr, heavyctr, moderatectr);

          if (veryheavyctr > heavyctr && veryheavyctr > moderatectr) {
            CourseLoad.updateOne({ coursecode: req.body.coursecode, profname: req.body.profname }, { $set: { load: "Very Heavy" } }, (err, docs) => {
              console.log(docs);
            })
          }
          else if (heavyctr > veryheavyctr && heavyctr > moderatectr) {
            CourseLoad.updateOne({ coursecode: req.body.coursecode, profname: req.body.profname }, { $set: { load: "Heavy" } }, (err, docs) => {
              console.log(docs);
            })
          }
          else {
            CourseLoad.updateOne({ coursecode: req.body.coursecode, profname: req.body.profname }, { $set: { load: "Moderate" } }, (err, docs) => {
              console.log(docs);
            })
          }
        })
        return res.status(200).send("Successful!");
      })
  }
}

module.exports = {
  postFeedback
}