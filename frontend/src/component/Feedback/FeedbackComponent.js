import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './ViewJob.css';
import axios from 'axios';
import { format } from 'path';
import $ from 'jquery';
import 'bootstrap';
import "./Feedback.css";
import SideNav from '../login/sidenav';

class FeedbackComponent extends Component {
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        console.log("Props: ", props.children);
        //maintain the state required for this component
        this.state = {
            coursecode: props.children[0],
            coursename: props.children[1],
            profname: props.children[2],
            courseload: props.children[3],
            grade: props.children[4],
            proffeedback: props.children[5],
            dateoffeedback: props.children[6]
        }

    }
    render() {
        return (
            <div>
                {/* <SideNav /> */}
                <div class="feedbackcomp">
                    <div class="row">
                        <div class="col-sm-3 first-col">
                            <h5 style={{borderBottom: "1px solid grey", paddingBottom: "10px", color: "white"}}><b>{this.state.dateoffeedback}</b></h5>
                            <h5 style={{color: "white"}}><b>Course Load:</b> {this.state.courseload}</h5>
                            <br></br>
                            <br></br>
                            <br></br>
                        </div>
                        <div class="col-sm-4 second-col">
                            <h5 style={{color: "white"}}><b>{this.state.coursecode}</b></h5>
                            <h5 style={{color: "white"}}><b>Course Name:</b> {this.state.coursename}</h5>
                            <h5 style={{color: "white"}}><b>Professor Name:</b> {this.state.profname}</h5> 
                            <h5 style={{color: "white"}}><b>Grade Received:</b> {this.state.grade}</h5>
                        </div>
                        <div class="col-sm-4 third-col" >
                           <h5> <b style={{color: "white"}}>{this.state.proffeedback}</b> </h5>
                        </div>
                    </div>

                </div>
            </div>
        )
    }





}

export default FeedbackComponent;