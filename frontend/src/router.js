import React, { Component } from 'react';
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom';
import Loginpage from './component/login/loginpage';
import Logout from './component/login/logout';
import { createBrowserHistory } from "history";
import Footer from './component/login/footer';
import Header from './component/login/header';
import SideNav from './component/login/sidenav';
import HomePage from './component/HomePage/HomePage';
import Aoiform from './component/Areaofinterestform/Aoiform';
import ViewJobs from './component/Student/ViewJob';
import Userprofile from './component/Userprofile/Userprofile';
import ViewFeedback from './component/Feedback/ViewFeedback';
import PostFeedback from './component/Feedback/PostFeedback';
import AlumniPostJob from './component/AlumniPostJob/AlumniPostJob';
import ViewPostedJobs from  './component/AlumniPostJob/ViewMyPostedJobs';
import ViewApplications from './component/AlumniPostJob/ViewApplications';
import ViewAppliedJobs from './component/Student/ViewAppliedJobs';
import CourseFeedback from './component/Feedback/CourseFeedback';

const history = createBrowserHistory();


class Router extends Component {
    render() {
        console.log("history in router", history);
        return (
            <BrowserRouter >
                <div>
                    <Route exact path="/" component={Loginpage} />
                    {/* <Route exact path="*" component={Header} /> */}
                    <Route exact path="/jobsearch" component={ViewJobs} />
                    <Route exact path="/appliedJobs" component={ViewAppliedJobs} />
                    <Route exact path="/viewfeedback" component={ViewFeedback} />
                    <Route exact path="/postfeedback" component={PostFeedback} />
                    <Route exact path="/alumnipostjob" component={AlumniPostJob} />
                    <Route exact path="/viewalumnijobs" component={ViewPostedJobs} />
                    <Route exact path="/coursefeedback" component={CourseFeedback} />
                    <Route exact path="/viewapplications" component={ViewApplications} />
                    
                    <Switch>
                        <Route exact path="/logout" component={Logout} />
                        <Route path="/homepage" component={HomePage} />
                        <Route path="/aoiform" component={Aoiform} />
                        <Route path="/footer" component={Footer} />
                        <Route path="/Userprofile" component={Userprofile} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}
export default Router;
