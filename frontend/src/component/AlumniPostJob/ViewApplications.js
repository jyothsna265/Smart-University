import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import '../Student/ViewJob.css';
import 'bootstrap';
import ApplicationComponent from './ApplicationComponent';
import SideNav from '../login/sidenav';
import './alumni.css';
class ViewApplications extends Component {
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        let obj = JSON.parse(localStorage.getItem('currentUser'));
        //maintain the state required for this component
        this.state = {
            currentUser: obj,
            reqIdObj: props.location.state,
            jobDetails: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3001/applications', {
            params: {
                reqId: this.state.reqIdObj.reqId
            }
        }).then((response) => {
            console.log("response",response.data);
        //update the state with the response data
        this.setState({
            jobDetails : this.state.jobDetails.concat(response.data) 
        });
        console.log("Job Details",this.state.jobDetails);
        })
    }

    render() {
        console.log("req props: " + this.state.reqIdObj.reqId)
        
        let allJobDetails = (this.state.jobDetails.length === 0) ? "No applications received" :this.state.jobDetails.map(jobDetails => {
            return (
                <tr> <ApplicationComponent>{jobDetails.applicant}{jobDetails.emaild}{jobDetails.resume}</ApplicationComponent> </tr>
            )
        })
        return(
            <div> 
                <SideNav />
                <div class="job-div">
                <div>
                    <table>
                        <tr>
                            <th> Applicant </th>
                            <th> Resume </th>
                        </tr>
                        {allJobDetails}     
                    </table>
                </div>
             </div>
            </div>
        )
    }
}

export default ViewApplications;