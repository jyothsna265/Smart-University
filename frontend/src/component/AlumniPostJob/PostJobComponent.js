import React, { Component } from 'react';
import './AlumniPostJob.css';
import 'bootstrap';
import SideNav from '../login/sidenav';

class PostJobComponent extends Component {
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
            location: props.children[7]
        }
        
    }

    render() {
        return (
            <div>
                <SideNav />
                <div class="alumjobcomp-div" >
                <div class="alumjobcomp-innerdiv" >
                    <h3 class="alumjobcomp-h3" style={{color: "orange"}}><u>{this.state.title}</u></h3>
                    <h4 class="alumjobcomp-h4">{this.state.company}</h4>
                    <h5 class="alumjobcomp-h5">{this.state.location}</h5>
                    <h4 class="alumjobcomp-h4"><u>Job Description</u></h4>
                    <h5 class="alumjobcomp-h5"><b>Requirement ID:</b> {this.state.reqId}</h5>
                    <h5 class="alumjobcomp-descr">{this.state.description}</h5>
                    <h4 class="alumjobcomp-h4"><u>Requirements</u></h4>
                    <h5 class="alumjobcomp-descr">{this.state.requirements}</h5>
                    <div class="row">
                        <div class="col-sm-6">
                            <h4 class="alumjobcomp-h5"><u><b>Employment Type:</b></u> </h4>
                            <h5 class="alumjobcomp-h5">{this.state.empType}</h5>
                        </div>
            
                    </div>
                   

                </div>
            </div>
            </div>

        )
    }
}

export default PostJobComponent;