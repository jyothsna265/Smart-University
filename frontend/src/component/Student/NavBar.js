import React from 'react';
//import './Feedback.css';
import { Link } from 'react-router-dom';

class NavBar extends React.Component{
    constructor() {
        super();
        this.state = {
            coursecode: "",
            feedbackDetails: []
        }
    }

    render() {
        return (
            <div>
                    <div class="feedback-div">
                        <div class="row feedback-row">
                        <div class="col-sm-4 homepage-col1">

                        </div>
                        <div class="col-sm-4">
                           
                        </div>
                        <div class="col-sm-2 feedback-col2">
                        <Link to={'/jobsearch'} class="j1" ><b> New Jobs </b></Link>
                            {/*<a href="/postfeedback" class="a1"><label>Post Feedback</label></a>*/}
                        </div>
                        <div class="col-sm-2 feedback-col3">
                            <Link to={'/appliedJobs'} class="j1"><b>Applied Jobs</b></Link>
                            {/*<a href="/viewfeedback" class="a1"><label>View Feedbacks</label></a>*/}
                        </div>
                        </div>
                    </div>
                </div>

        )
    }
}

export default NavBar;