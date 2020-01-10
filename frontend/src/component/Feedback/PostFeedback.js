import React from 'react';
import './Feedback.css';
import axios from 'axios';
import { Redirect, Link, NavLink } from 'react-router-dom';
import $ from 'jquery';
import SideNav from '../login/sidenav';

class PostFeedback extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coursecode: "",
            coursename: "",
            profname: "",
            courseload: "",
            grade: "",
            proffeedback: "",
            dateoffeedback: "",
            feedbackDetails: [],
            formRef: null,
            postFeedbackFlag: false
        }

        this.coursecodeChangeHandler = this.coursecodeChangeHandler.bind(this);
        this.coursenameChangeHandler = this.coursenameChangeHandler.bind(this);
        this.profnameChangeHandler = this.profnameChangeHandler.bind(this);
        this.courseLoadChangeHandler = this.courseLoadChangeHandler.bind(this);
        this.gradeChangeHandler = this.gradeChangeHandler.bind(this);
        this.proffeedbackChangeHandler = this.proffeedbackChangeHandler.bind(this);
        this.dateoffeedbackChangeHandler = this.dateoffeedbackChangeHandler.bind(this);
    }

    coursecodeChangeHandler = (e) => {
        this.setState({
            coursecode: e.target.value
        })
    }

    coursenameChangeHandler = (e) => {
        this.setState({
            coursename: e.target.value
        })
    }

    profnameChangeHandler = (e) => {
        this.setState({
            profname: e.target.value
        })
    }

    courseLoadChangeHandler = (e) => {
        this.setState({
            courseload: e.target.value
        })
    }

    gradeChangeHandler = (e) => {
        this.setState({
            grade: e.target.value
        })
    }

    proffeedbackChangeHandler = (e) => {
        this.setState({
            proffeedback: e.target.value
        })
    }

    dateoffeedbackChangeHandler = (e) => {
        this.setState({
            dateoffeedback: e.target.value
        })
    }

    submitPostFeedback = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();

        const data = {
            coursecode: this.state.coursecode,
            coursename: this.state.coursename,
            profname: this.state.profname,
            courseload: this.state.courseload,
            grade: this.state.grade,
            proffeedback: this.state.proffeedback,
            dateoffeedback: this.state.dateoffeedback
        }
        console.log("Feedback data:", data);

        //set the with credentials to true
        axios.defaults.withCredentials = true;

        //make a post request with the user data
        axios.post('http://localhost:3001/postfeedback', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setState({
                        postFeedbackFlag: true,
                        successMsg: "Feedback Posted successfully",
                    })
                    alert("Feedback Posted successfully");

                    $('.form-control').val('');
                    $('.dropdown-control').val('');
                    $('.text-control').val('');
                    $('.date-control').val('');

                } else {
                    alert("Feedback Posting unsuccessful");
                    this.setState({
                        postFeedbackFlag: false,
                        successMsg: "Feedback Posting unsuccessful"
                    })
                }
            });
    }

    render() {
        return (
            <div >
                <SideNav />
                <div class="feedback-maindiv" >
                    <div class="feedback-div" style={{ marginTop: "-20px" }}>
                        <div class="row feedback-row">
                            <div class="col-sm-4 homepage-col1">

                            </div>
                            <div class="col-sm-4">

                            </div>
                            <div class="col-sm-2 feedback-col2">
                                <Link to={'/postfeedback'} class="a1" > <b>Post Feedback</b> </Link>
                                {/*} <a href="/postfeedback" class="a1"><label>Post Feedback</label></a>*/}
                            </div>
                            <div class="col-sm-2 feedback-col3">
                                <Link to={'/viewfeedback'} class="a1"> <b>View Feedbacks</b></Link>
                                {/*<a href="/viewfeedback" class="a1"><label>View Feedbacks</label></a>*/}
                            </div>
                        </div>
                    </div>
                    <h3 style={{ marginLeft: "550px", color: "orange", fontFamily: "sans-serif" }}> Please fill in the details to provide:</h3>
                    <div class="postfeedback-div">
                        <div class="feedback-form">
                            <div class="container">
                                <h2 style={{ fontFamily: "sans-serif", textAlign: "center", marginBottom: "20px", fontWeight: "bold" }}></h2>
                                <fieldset>
                                    <div className="form-group">
                                        <input type="text" initialValue="" id="coursecode" name="coursecode" onChange={this.coursecodeChangeHandler} placeholder="Enter the Course Code" class="form-control" />
                                    </div>

                                    <div className="form-group">
                                        <input type="text" initialValue="" id="coursename" name="coursename" onChange={this.coursenameChangeHandler} placeholder="Enter the Course Name" class="form-control" />
                                    </div>

                                    <div className="form-group">
                                        <input type="text" id="profname" name="profname" onChange={this.profnameChangeHandler} placeholder="Enter the Professor Name" class="form-control" />
                                    </div>

                                    <div className="dropdown">
                                        <select id="courseload" name="courseload" class="dropdown-control" style={{ marginTop: "20px" }} onChange={this.courseLoadChangeHandler}>
                                            <option value="None">Course Load</option>
                                            <option value="Very Heavy">Very Heavy</option>
                                            <option value="Heavy">Heavy</option>
                                            <option value="Moderate">Moderate</option>
                                        </select>
                                    </div>

                                    <div className="dropdown">
                                        <select id="grade" name="grade" class="dropdown-control" style={{ marginTop: "20px" }} onChange={this.gradeChangeHandler}>
                                            <option value="None">Grade Received</option>
                                            <option value="A+">A+</option>
                                            <option value="A">A</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B">B</option>
                                            <option value="B-">B-</option>
                                            <option value="C+">C+</option>
                                            <option value="C">C</option>
                                            <option value="C-">C-</option>
                                            <option value="D+">D+</option>
                                            <option value="D">D</option>
                                            <option value="D-">D-</option>
                                            <option value="F">F</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <input type="date" id="dateoffeedback" name="dateoffeedback" onChange={this.dateoffeedbackChangeHandler} placeholder="Feedback Date" class="date-control" />
                                    </div>

                                    <div className="form-group">
                                        <textarea id="proffeedback" name="proffeedback" row="50" cols="40" onChange={this.proffeedbackChangeHandler} placeholder="Describe the course and the level of difficulty and other relevant details" class="text-control">

                                        </textarea>
                                    </div>

                                    <button onClick={this.submitPostFeedback} class="postfeedback-btn" style={{marginBottom: "50px"}}>Submit</button>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{paddingBottom:"30px"}}>
                
                </div>
            </div>
        )
    }
}

export default PostFeedback;