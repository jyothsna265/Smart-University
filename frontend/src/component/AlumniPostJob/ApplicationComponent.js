import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './alumni.css'


class ApplicationComponent extends Component {
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        this.state = {
            applicant: JSON.stringify(this.props.children[0]),
            resume: this.props.children[2]
        }
    }

    render() {
        console.log("applicant" + this.state.applicant)
        console.log("resume" + this.state.resume);
        let resumeUrl = this.state.resume;
        return (
            <div >
                <td>{this.state.applicant}</td> 
                <td> <a href={resumeUrl}> Download </a> </td>
            </div>

        )
    }
}

export default ApplicationComponent;
