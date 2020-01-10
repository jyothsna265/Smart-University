import React from 'react';
import './Feedback.css';
import axios from 'axios';
import FeedbackComponent from './FeedbackComponent';
import $ from 'jquery';
import cookie from 'react-cookies';
import { Redirect, Link, NavLink } from 'react-router-dom';
import Pagination from "react-js-pagination";
import SideNav from '../login/sidenav';

class ViewFeedback extends React.Component {
    constructor() {
        super();
        this.state = {
            coursecode: "",
            feedbackDetails: []
        }
        this.coursecodeChangeHandler = this.coursecodeChangeHandler.bind(this);
    }

    coursecodeChangeHandler = (e) => {
        this.setState({
            coursecode: e.target.value
        })
    }

    resetFeedback = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        console.log("within reset function")
        //window.location.reload(true);
        this.setState({ feedbackDetails: [] });
    }

    submitGetFeedback = (e) => {

        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            coursecode: this.state.coursecode,
        }
        console.log("Feedback data:", data);

        //set the with credentials to true
        axios.defaults.withCredentials = true;
        this.state.feedbackDetails = []

        //make a post request with the user data
        axios.post('http://localhost:3001/viewfeedback', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                console.log("Response Data : ", response.data);
                
                if (response.status === 200) {
                    //alert("Feedback Posted successfully");
                    
                    this.setState({
                        feedbackDetails: this.state.feedbackDetails.concat(response.data),
                        postFeedbackFlag: true,
                        successMsg: "Feedback Posted successfully"
                    })
                    if ( this.state.feedbackDetails.length == 0){
                        alert("No Records found for the specified course");
                    }
                } else {
                    //alert("Feedback Posting unsuccessful");
                    this.setState({
                        postFeedbackFlag: false,
                        successMsg: "Feedback Posting unsuccessful"
                    })
                }
            });
    }

    render() {
        let redirectVar = null;
        if (this.state.postFeedbackFlag) {
            redirectVar = <Redirect to="/viewfeedback" />
        }
        console.log("Within render")
        console.log(this.state.feedbackDetails);
        var allFeedbackDetails = []
        allFeedbackDetails = this.state.feedbackDetails.map(feedbackDetails => {
            console.log(feedbackDetails);
            return (
                <FeedbackComponent>{feedbackDetails.coursecode}{feedbackDetails.coursename}{feedbackDetails.profname}{feedbackDetails.courseload}{feedbackDetails.grade}{feedbackDetails.proffeedback}{feedbackDetails.dateoffeedback}</FeedbackComponent>
            )
        })
        if (allFeedbackDetails == []) {
            allFeedbackDetails = "No records found for the specified course"
            console.log("within if: ", allFeedbackDetails)
        }
        return (
            <div>
                <SideNav />
                <div class="feedback-maindiv">
                <div class="feedback-div" style={{ marginTop: "-20px" }}>
                    <div class="row feedback-row">
                        <div class="col-sm-4 homepage-col1">

                        </div>
                        <div class="col-sm-4">

                        </div>
                        <div class="col-sm-2 feedback-col2">
                            <Link to={'/postfeedback'} class="a1" ><b>Post Feedback</b> </Link>
                            {/*<a href="/postfeedback" class="a1"><label>Post Feedback</label></a>*/}
                        </div>
                        <div class="col-sm-2 feedback-col3">
                            <Link to={'/viewfeedback'} class="a1"><b>View Feedbacks</b></Link>
                            {/*<a href="/viewfeedback" class="a1"><label>View Feedbacks</label></a>*/}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-6" style={{ textAlign: "right" }}>
                        <label style={{ marginLeft: "450px", marginTop: "20px", textAlign: "right", fontFamily: "sans-serif", fontSize: "20px", color: "orange" }}>Enter the course code: </label>
                    </div>
                    <div className="col-sm-4" style={{ marginTop: "15px", width: "15%", textAlign: "left", height: "40px" }}>
                        <input type="text" id="coursecode" name="coursecode" onChange={this.coursecodeChangeHandler} class="form-control" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6"></div>
                    <div className="col-sm-3" style={{ marginLeft: "-200px" }}>
                        <button onClick={this.submitGetFeedback} class="postfeedback-btn1" style={{ textAlign: "center", paddingRight: "20px" }}>Submit</button>
                    </div>
                    <div className="col-sm-3" style={{ marginLeft: "-200px" }} >
                        <button onClick={this.resetFeedback} class="postfeedback-btn1">Reset</button>
                    </div>

                </div>
                <div class="feedbackdetails" style={{ paddingBottom: "500px" }}>
                    {allFeedbackDetails}
                </div>
            </div>
            </div>
            
        )
    }
}

export default ViewFeedback;