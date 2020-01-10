import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ViewJob.css';
import axios from 'axios';
import { format } from 'path';
import $ from 'jquery'; 
import 'bootstrap';
import { connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/actionCreators';

class AppliedJobDetailsComponent extends Component {
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        console.log("Props: ", props.children[0]);
        //maintain the state required for this component
        this.state = {
            company: props.children[0],
            title: props.children[1],
            reqId: props.children[2],
            description: props.children[3],
            requirements: props.children[4],
            empType: props.children[5],
            location: props.children[7],
            postedBy: props.children[8],
            applied: true,
            jobsFlag: false,
            file: null,
            hasApplied: false
        }
        //Bind the handlers to this class
        this.submitLogin = this.submitLogin.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
    }

    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            applied: this.state.applied
        }

        console.log("Job details:", data);
        //set the with credentials to true
        axios.defaults.withCredentials = true;

        //make a post request with the user data
        axios.post('http://localhost:3001/jobs', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 201) {
                    this.setState({
                        jobsFlag: true
                    })
                } else {
                    this.setState({
                        jobsFlag: false
                    })
                }
            });
    }

    // uploadHandler = (event) => {
    //     event.preventDefault();
    //     const formData = new FormData();
    //     formData.append('file', this.state.file);
    //     formData.append('reqId', this.state.reqId);
    //     formData.append('applicant', this.props.login.firstname + " " + this.props.login.lastname);
    //     formData.append('emailID', this.props.login.emailID);
    //     axios.defaults.withCredentials = true;
    //     //make a post request with the user data
    //     axios.post('http://localhost:3001/apply', formData, {
    //         headers: {
    //           "Content-Type": "multipart/form-data"
    //         }
    //       }).then(response => {
    //         console.log("Status Code : ", response.status);
    //         if (response.status === 200) {
    //             window.$('#exampleModalCenter').modal('hide');
    //             window.$('body').removeClass('modal-open');
    //             window.$('.modal-backdrop').remove();
    //             this.setState({
    //                 hasApplied: true
    //             })
    //             console.log(this.state.hasApplied);
    //         } else {
    //             this.setState({
    //                 hasApplied: false
    //             })
    //         }
    //     });
    // }

    handleFileUpload = (event) => {
        this.setState({ file: event.target.files[0]})
    };

    render() {
        return (
            <div class="jobcomp-div" >
                <div class="jobcomp-innerdiv">
                    <h3 class="jobcomp-h3" style={{color: "orange"}}><u>{this.state.title}</u></h3>
                    <h4 class="jobcomp-h4">{this.state.company}</h4>
                    <h5 class="jobcomp-h5">{this.state.location}</h5>
                    <h4 class="jobcomp-h4"><u>Job Description</u></h4>
                    <h5 class="jobcomp-h5">Requirement ID: {this.state.reqId}</h5>
                    <h5 class="jobcomp-descr">{this.state.description}</h5>
                    <h4 class="jobcomp-h4"><u>Requirements:</u></h4>
                    <h5 class="jobcomp-descr">{this.state.requirements}</h5>
                    <div class="row">
                        <div class="col-sm-6">
                            <h4 class="jobcomp-h5"><u>Employment Type: </u></h4>
                            <h5 class="jobcomp-h5">{this.state.empType}</h5>
                        </div>
                        <div class="col-sm-6" style={{ textAlign: "center" }}>
                            <h5 class="jobcomp-h5" >Posted By: {this.state.postedBy}</h5>
                        </div>
                    </div>
                    <div>
                        {/*<button class="jobs-btn" data-toggle="modal" data-target="#exampleModalCenter">Update Resume</button>
                        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h3 class="modal-title" id="exampleModalLongTitle"> Change Resume </h3>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                            <div class="form-group">
                                <input onChange={this.handleFileUpload} type="file" class="custom-file-input" name="resume" accept=".pdf" />
                            </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                {/*<button type="button" onClick={this.uploadHandler} class="btn btn-primary">Update</button>
                            </div>
                            </div>
                        </div>
                    </div>*/}
                    </div>
                </div>
                <div style={{paddingBottom: "310px"}}>
                
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

export default connect(mapStateToProps,mapDispatchToProps)(AppliedJobDetailsComponent);
  
