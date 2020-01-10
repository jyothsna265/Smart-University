import React from 'react';
import './Feedback.css';
import axios from 'axios';
import { Redirect, Link, NavLink } from 'react-router-dom';
import SideNav from '../login/sidenav';

class CourseFeedback extends React.Component{
    constructor() {
        super();
        this.state = {
            coursecode: "",
            feedbackDetails: []
        }
    }

    render() {
        return (
            <div> 
                <SideNav /> 
                <div class="cf-maindiv">

                    <div class="feedback-div" style={{marginTop: "-20px"}}>
                        <div class="row feedback-row">
                            <div class="col-sm-4 homepage-col1">

                            </div>
                            <div class="col-sm-4">
                               
                            </div>
                            <div class="col-sm-2 feedback-col2">
                            <Link to={'/postfeedback'} class="a1" ><b> Post Feedback </b></Link>
                                {/*<a href="/postfeedback" class="a1"><label>Post Feedback</label></a>*/}
                            </div>
                            <div class="col-sm-2 feedback-col3">
                                <Link to={'/viewfeedback'} class="a1"><b>View Feedbacks</b></Link>
                                {/*<a href="/viewfeedback" class="a1"><label>View Feedbacks</label></a>*/}
                            </div>
                        </div>
                    </div>
                    <div>
                    <br></br>
                    <br></br>
                    <h3 style={{textAlign: "center", color: "orange", fontSize: "24px", fontFamily: "sans-serif", marginLeft: "300px", marginRight: "300px"}}>Welcomce to the Course Feedback page</h3>
                    <p style={{textAlign: "center", color: "white", fontSize: "16px", fontFamily: "sans-serif", marginLeft: "300px", marginRight: "300px"}} >This page can be used by the student to record the course feedback by submitting all the relevant details needed including the detail description regarding the courses taken, the level of difficulty, grade recieved etc. </p>
                    <p style={{textAlign: "center", color: "white", fontSize: "16px", fontFamily: "sans-serif", marginLeft: "300px", marginRight: "300px"}}>And also, the students are provided an option to view all the feedbacks provided by other students to get a better understanding of the course.</p>

                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    </div>
                </div>
            </div>
            

        )
    }
}

export default CourseFeedback;