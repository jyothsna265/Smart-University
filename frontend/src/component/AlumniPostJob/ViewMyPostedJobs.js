import React from 'react';
import '../Student/ViewJob.css';
import axios from 'axios';
import DetailsComponent from '../Student/NewJobDetailsComponent';
import NavBar from '../Student/NavBar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/actionCreators';
import AppliedJobDetailsComponent from './JobDetailsComponent';
import SideNav from '../login/sidenav';

class ViewMyPostedJobs extends React.Component {
    constructor() {
        super();
        let obj = JSON.parse(localStorage.getItem('currentUser'));
        this.state = {
            currentUser: obj,
            jobDetails: []
        }
    }
    //get the books data from backend  
    componentDidMount() {
        console.log("Curr User Email: " + this.state.currentUser.emailID)
        axios.get('http://localhost:3001/postedjobs', {
            params: {
                postedBy: this.state.currentUser.emailID
            }
        }).then((response) => {
            console.log("response", response.data);
            //update the state with the response data
            this.setState({
                jobDetails: this.state.jobDetails.concat(response.data)
            });
            console.log("Job Details", this.state.jobDetails);
        });

    }

    render() {
        let allJobDetails = this.state.jobDetails.map(jobDetails => {
            return (
                <AppliedJobDetailsComponent>{jobDetails.company}{jobDetails.title}{jobDetails.reqId}{jobDetails.description}{jobDetails.requirements}{jobDetails.empType}{jobDetails.duration}{jobDetails.location}</AppliedJobDetailsComponent>
            )
        })
        return (
            <div>
                <SideNav />
                <div class="job-div">
                    <div style={{ paddingTop: "30px", paddingBottom: "800px" }}>
                        <h3 style={{ color: "white", paddingTop: "30px", fontFamily: "sans-serif", marginLeft: "300px" }}><b>This page provides all the jobs posted by you. These jobs can be viewed by the students.</b></h3>
                        {allJobDetails}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { login: state.login.loginData }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewMyPostedJobs);
