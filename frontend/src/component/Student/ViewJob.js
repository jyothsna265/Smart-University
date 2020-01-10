import React from 'react';
import './ViewJob.css';
import axios from 'axios';
import DetailsComponent from './NewJobDetailsComponent';
import NavBar from './NavBar';
import SideNav from '../login/sidenav';

class ViewJob extends React.Component {
    constructor(){
        super();
        this.state = {  
            jobDetails : []
        }
    }  
    //get the books data from backend  
    componentDidMount(){
        axios.get('http://localhost:3001/newjobs')
                .then((response) => {
                    console.log("response",response.data);
                //update the state with the response data
                this.setState({
                    jobDetails : this.state.jobDetails.concat(response.data) 
                });
                console.log("Job Details",this.state.jobDetails);
            });
    }

    render() {
        let allJobDetails = this.state.jobDetails.map(jobDetails => {
            return (
                <DetailsComponent>{jobDetails.company}{jobDetails.title}{jobDetails.reqId}{jobDetails.description}{jobDetails.requirements}{jobDetails.empType}{jobDetails.duration}{jobDetails.location}{jobDetails.postedBy}</DetailsComponent>
            )
        })
        return(
            <div> 
                <SideNav />
                <div class="job-div">
                <NavBar/>
                <div>
                {allJobDetails}
                </div>
            </div>
            </div>
        )
    }
}

export default ViewJob;
