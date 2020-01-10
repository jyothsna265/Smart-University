import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../Student/ViewJob.css';
import 'bootstrap';
import { connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/actionCreators';

class JobDetailsComponent extends Component {
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        let obj = JSON.parse(localStorage.getItem('currentUser'));
        //maintain the state required for this component
        this.state = {
            currentUser: obj,
            company: props.children[0],
            title: props.children[1],
            reqId: props.children[2],
            description: props.children[3],
            requirements: props.children[4],
            empType: props.children[5],
            location: props.children[7],
            applied: true,
            jobsFlag: false,
            file: null,
            hasApplied: false
        }
    }

    render() {
        console.log("reqid: ", this.state.reqId);
        return (
            <div class="jobcomp-div" >
                <div class="jobcomp-innerdiv">
                    <h3 class="jobcomp-h3" style={{color: "orange"}}>{this.state.title}</h3>
                    <h4 class="jobcomp-h4">{this.state.company}</h4>
                    <h5 class="jobcomp-h5">{this.state.location}</h5>
                    <h4 class="jobcomp-h4"><u>Job Description</u></h4>
                    <h5 class="jobcomp-h5">Requirement ID: {this.state.reqId}</h5>
                    <h5 class="jobcomp-descr" style={{textAlign: "justify"}}>{this.state.description}</h5>
                    <h4 class="jobcomp-h4"><u>Requirements</u></h4>
                    <h5 class="jobcomp-descr">{this.state.requirements}</h5>
                    <div class="row">
                        <div class="col-sm-6">
                            <u><h5 class="jobcomp-h5">Employment Type: {this.state.empType} </h5></u>
                            <h5 class="jobcomp-h5"></h5>
                        </div>
                        <div class="col-sm-6" style={{ textAlign: "center" }}>
                            <h5 class="jobcomp-h5" >Posted By: {this.state.currentUser.firstname}</h5>
                        </div>
                    </div>
                    <div>
                        <Link to={{
                            pathname: '/viewapplications',
                            state: {
                                reqId: this.state.reqId
                            }
                        }}>View Applications</Link>
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

export default connect(mapStateToProps,mapDispatchToProps)(JobDetailsComponent);
