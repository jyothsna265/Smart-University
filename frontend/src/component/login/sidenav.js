import React, { Component } from 'react';
import './sidenav.css';
import axios from 'axios';
import { Redirect, Link, BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/actionCreators';
import { nodeURL } from '../../config';

class SideNav extends Component {
    constructor(props){
        super(props);
        if(localStorage.getItem("currentUser") === null){
            window.location.reload();
        } else {
            let obj =  JSON.parse(localStorage.getItem('currentUser'));
            this.state = {
                currentUser: obj
            }
        }
        

        this.openHandler = this.openHandler.bind(this);
        this.closeHandler = this.closeHandler.bind(this);
        this.logout = this.logout.bind(this);
    }

    openHandler(){
        console.log("open handler");
        document.getElementById("mySidenav").style.width = "250px";
    }

    closeHandler(){
        document.getElementById("mySidenav").style.width = "0";
    }

    logout = () => {
        console.log("Logout")
        axios.post(nodeURL + `/logout`)
            .then(response => {
                localStorage.clear();
            })
    }
    
    render(){
        // const {pathname} = this.props.location;
        // if(pathname === "/") {
        //     return null;
        // } 
        console.log("User Type: " + JSON.stringify(this.state.currentUser))
        if (this.state.currentUser.type == "0") {
            var coursefeedback = (
                <Link to={'/coursefeedback'} activeClassName="selected"> Course Feedback </Link>
            )
            var courserecommendations = (
                <Link to={'/aoiform'} > Course Recommendations </Link>
            )
            var jobsearch = (
                <Link to={'/jobsearch'} > Job Search </Link>
            )
            var alumnipostjob = ""
            var viewpostedjobs = ""
        }
        else if (this.state.currentUser.type == "1") {
            var coursefeedback = ""
            var courserecommendations = ""
            var jobsearch = ""
            var alumnipostjob = (
                <Link to={'/alumnipostjob'} > Post Jobs</Link>
            )
            var viewpostedjobs = (
                <Link to={'/viewalumnijobs'} >View Jobs</Link>
            )
        }
        return (
           
        <div class="sideNav" style={{backdgroundColor:"orange"}}>
            <div id="mySidenav" class="sidenav">
            <a href="javascript:void(0)" class="closebtn" onClick={this.closeHandler}>&times;</a>
            {coursefeedback}
            {courserecommendations}
            {jobsearch}
            {alumnipostjob}
            {viewpostedjobs}
            <Link to={'/Userprofile'} > Profile </Link>
            <Link to={'/'} onClick={this.logout} >  Logout </Link>
            </div>
            <span onClick={this.openHandler}>&#9776; <div  style={{display:"inline-block",backgroundColor:"orange", width:"1244px"}}><i><b>smartU</b></i></div></span>
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

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);