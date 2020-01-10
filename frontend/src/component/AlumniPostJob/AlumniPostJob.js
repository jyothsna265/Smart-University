import React from 'react';
import './AlumniPostJob.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SideNav from '../login/sidenav';
import $ from 'jquery';

class AlumniPostJob extends React.Component {

  constructor(props) {
    super(props);
    let obj = JSON.parse(localStorage.getItem('currentUser'));
    this.state = {
      company: "",
      jobtitle: "",
      jobdescription: "",
      jobreqs: "",
      emptype: "",
      duration: "",
      location: "",
      reqID: "",
      alumniPostJobDetails: [],
      postJobFlag: false,
      currentUser: obj
    }
    //Bind the handlers to this class
    this.companyChangeHandler = this.companyChangeHandler.bind(this);
    this.jobtitleChangeHandler = this.jobtitleChangeHandler.bind(this);
    this.jobdescriptionChangeHandler = this.jobdescriptionChangeHandler.bind(this);
    this.jobreqsChangeHandler = this.jobreqsChangeHandler.bind(this);
    this.emptypeChangeHandler = this.emptypeChangeHandler.bind(this);
    this.durationChangeHandler = this.durationChangeHandler.bind(this);
    this.locationChangeHandler = this.locationChangeHandler.bind(this);
    this.reqIDChangeHandler = this.reqIDChangeHandler.bind(this);
    this.submitPostJob = this.submitPostJob.bind(this);
  }

  //firstname change handler to update state variable with the text entered by the user
  companyChangeHandler = (e) => {
    this.setState({
      company: e.target.value
    })
  }

  jobtitleChangeHandler = (e) => {
    this.setState({
      jobtitle: e.target.value
    })
  }

  jobdescriptionChangeHandler = (e) => {
    this.setState({
      jobdescription: e.target.value
    })
  }

  jobreqsChangeHandler = (e) => {
    this.setState({
      jobreqs: e.target.value
    })
  }

  emptypeChangeHandler = (e) => {
    this.setState({
      emptype: e.target.value
    })
  }

  locationChangeHandler = (e) => {
    this.setState({
      location: e.target.value
    })
  }

  durationChangeHandler = (e) => {
    this.setState({
      duration: e.target.value
    })
  }

  reqIDChangeHandler = (e) => {
    this.setState({
      reqID: e.target.value
    })
  }

  //submit Login handler to send a request to the node backend
  submitPostJob = (e) => {
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const data = {
      company: this.state.company,
      title: this.state.jobtitle,
      reqID: this.state.reqID,
      description: this.state.jobdescription,
      requirements: this.state.jobreqs,
      empType: this.state.emptype,
      location: this.state.location,
      duration: this.state.duration,
      emailId: this.state.currentUser.emailID
    }
    console.log("Alumni data:", data);
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post('http://localhost:3001/job', data)
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          alert("Job Posting successful");
          this.setState({
            alumniFlag: true,
            successMsg: "Job posting successful"
          })
          $('.form-control').val('');
          $('.dropdowncntl').val('');

        } else {
          alert("Job Posting unsuccessful");
          this.setState({
            alumniFlag: false,
            successMsg: "Job posting unsucessful"
          })
        }
      });
  }

  render() {
    return (
      <div>
        <SideNav />
        <div class='first-div'>
          <div class="Alumni-form">
            <div class="container">
              <h2 style={{ fontFamily: "sans-serif", marginLeft: "430px", marginBottom: "20px", fontWeight: "bold", color: "white" }}>Enter the Job details</h2>
              <fieldset>
                <div className="form-group">
                  <input type="text" id="company" name="company" onChange={this.companyChangeHandler} placeholder="Enter the Company Name" class="form-control" />
                </div>

                <div className="form-group">
                  <input type="text" id="jobtitle" name="jobtitle" onChange={this.jobtitleChangeHandler} placeholder="Enter the Job Title" class="form-control" />
                </div>

                <div className="form-group">
                  <input type="text" id="reqID" name="reqID" onChange={this.reqIDChangeHandler} placeholder="Enter the Job Requirement ID" class="form-control" />
                </div>

                <div className="form-group">
                  <input type="text" id="jobdescription" name="jobdescription" onChange={this.jobdescriptionChangeHandler} placeholder="Enter the Job Description" class="form-control" />
                </div>

                <div className="form-group">
                  <input type="text" id="jobreqs" name="jobreqs" onChange={this.jobreqsChangeHandler} placeholder="Enter the Job Requirements" class="form-control" />
                </div>

                <div className="dropdown">
                  <label for="emptype" style={{ marginRight: "10px", fontFamily: "sans-serif", color: "White" }}>Employment Type</label>
                  <select id="emptype" name="emptype" class="dropdowncntl" onChange={this.emptypeChangeHandler}>
                    <option value="None">None</option>
                    <option value="fulltime">Full-Time</option>
                    <option value="parttime">Part-Time</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>

                <div className="form-group">
                  <input type="text" id="duration" name="duration" onChange={this.durationChangeHandler} placeholder="Enter the duration" class="form-control" />
                </div>

                <div className="form-group">
                  <input type="text" id="location" name="location" onChange={this.locationChangeHandler} placeholder="Enter the location" class="form-control" />
                </div>

                <button onClick={this.submitPostJob} class="postjob-btn">Submit</button>
              </fieldset>
            </div>
          </div>
          <div style={{ paddingBottom: "150px" }}>
          </div>
        </div>

      </div>
    )
  }

}


export default AlumniPostJob;
