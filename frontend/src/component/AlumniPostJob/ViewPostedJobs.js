import React from 'react';
import '../Student/ViewJob.css';
import axios from 'axios';
import PostJobComponent from './PostJobComponent';
import SideNav from '../login/sidenav';

class ViewPostedJobs extends React.Component {
    constructor() {
        super();
        this.state = {
            jobDetails: []
        }
    }
    //get the books data from backend  
    componentDidMount() {
        axios.get('http://localhost:3001/jobs')
            .then((response) => {
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
                <PostJobComponent>{jobDetails.company}{jobDetails.title}{jobDetails.reqId}{jobDetails.description}{jobDetails.requirements}{jobDetails.empType}{jobDetails.duration}{jobDetails.location}</PostJobComponent>
            )
        })
        return (
            <div>
                <SideNav />
                <div class="job-div">

                    <div class="jobdetails" >
                        <h3 style={{ paddingTop: "30px", fontFamily: "sans-serif", marginLeft: "300px" }}><b>This page provides all the jobs posted by you. These jobs can be viewed by the students.</b></h3>
                        {allJobDetails}
                    </div>
                    </div>
            </div>
        )
    }
}

export default ViewPostedJobs;