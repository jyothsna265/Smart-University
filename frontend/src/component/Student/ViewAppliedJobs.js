import React from 'react';
import './ViewJob.css';
import axios from 'axios';
import DetailsComponent from './NewJobDetailsComponent';
import NavBar from './NavBar';
import { connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/actionCreators';
import AppliedJobDetailsComponent from './AppliedJobDetailsComponent';
import SideNav from '../login/sidenav';

class ViewAppliedJobs extends React.Component {
    constructor(){
        super();
        this.state = {  
            jobDetails : []
        }
    }  
    //get the books data from backend  
    componentDidMount(){
        let email = this.props.login.emailID;
        axios.get('http://localhost:3001/appliedjobs', {
            params: {
                emailid: email
            }
        }).then((response) => {
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
                <AppliedJobDetailsComponent>{jobDetails.company}{jobDetails.title}{jobDetails.reqId}{jobDetails.description}{jobDetails.requirements}{jobDetails.empType}{jobDetails.duration}{jobDetails.location}{jobDetails.postedBy}</AppliedJobDetailsComponent>
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

function mapStateToProps(state){
    return {login: state.login.loginData}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(ViewAppliedJobs);
