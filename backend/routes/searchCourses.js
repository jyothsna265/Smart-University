const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
var Course = require('../models/courses');
var CourseLoad = require('../models/courseload').Courseload;


// router.post("/searchCourses", function(req, res) {

//     console.log("Inside search Courses  Request at Backend")
//     let msg = req.body;
//     let data = msg;
//     Course.find({keyword: data.aoi})
//     .then(response=>{
//                 let output = response;
//                 console.log("Find courses successfully", output);
//                 res.end(JSON.stringify(output));
        
//             })
//             .catch(err =>{
//                 console.log("Inside err");
//                 res.sendStatus(401).end("find courses details error");
//                 console.log("findcourse error",err)
        
//             })
//     })
    
router.post("/searchCourses", function(req, res) {

    console.log("Inside search Courses  Request at Backend",req.body);
    let msg = req.body;
    let data = msg;
    let major = req.body.major;
    major = major.replace(/\s+/g, '');
    console.log("major",major.toLowerCase());
    Course.find({category: "core",branch: data.major.replace(/\s+/g, '').toLowerCase()})
    .then(output =>{
        Course.find({keyword: data.aoi.replace(/\s+/g, '').toLowerCase(), category: {$not : /core/}})
        .then(response=>{
            response.map(row => output.push(row));
                console.log("Find courses successfully", output);
                Course.find({category:"elective"}).limit(10-output.length+2)
                .then(finalop=>{
                    finalop.map(value => output.push(value));
                    res.end(JSON.stringify(output));
                })
            })
            .catch(err =>{
                console.log("Inside err");
                res.sendStatus(401).end("find courses details error");
                console.log("findcourse error",err)
            })
    })
    .catch(err =>{
        console.log("Inside err");
        res.sendStatus(401).end("find courses details error");
        console.log("findcourse error",err);
    })
})

    
    //fjksdfkjs
    // console.log(data.major.replace(/\s+/g, '').toLowerCase());
    // Course.find({category: "core",branch: data.major.replace(/\s+/g, '').toLowerCase()})
    // .then(output => {
    //     console.log("oopp10: ",output);
    //     callback(output, prom2);
    // })

    // var prom2 = new Promise((resolve, reject)=>{
    //     Course.find({keyword: data.aoi.replace(/\s+/g, '').toLowerCase(), category: {$not : /core/}})
    //         .then(response=> {
    //             resolve(response);
    //         })
    // })

    // function callback(output, prom2) {
    //     prom2.then((response) => {
    //         console.log("oopp1: ",output);
    //         console.log("oopp2: ",response);
    //     }).catch((err)=> {
    //         console.log("Error occured!");
    //     })
    // }
    




router.get("/getProfessor", function(req, res) {

    console.log("get Professor");
    let output = [];
    let msg = req.body;
    let data = msg;
        // console.log("ip"+input);
        CourseLoad.find({coursecode: req.query.id})
        .then(response=>{
            console.log(req.query.id,response);
            res.end(JSON.stringify(response));   
        })
        .catch(err =>{
            console.log("Inside err");
            res.sendStatus(401).end("find courses details error");
            console.log(" error",err)
    
        })
})



module.exports = router;