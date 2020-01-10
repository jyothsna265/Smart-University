import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/actionCreators';
import { nodeURL } from '../../config';
import './homepage.css';
import SideNav from '../login/sidenav';
// import "./hmmaindashboard.css"

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusdata: [],
            currentapplicant: [],
            switch: false,
            linkstatus: "",
            linkedapplicantdetails: [],
            introstatusswitch: "NotApproved",

        }
    }
    componentDidMount() {
        axios.get(nodeURL + `/statusdetails`, {
        })
            .then((response) => {
                console.log("response", response.data);
                this.setState({
                    statusdata: response.data
                })
            })
            .catch(err => {
                this.setState({})
            })

    }
    navigate(id) {
        console.log("in the navigate and id id " + id);
        axios.defaults.withCredentials = true;
        axios.get(nodeURL + `/selectjob/` + id)
            .then(response => {
                console.log(response.data);


                if (response.status === 200) {
                    console.log("i am in rw");

                    this.props.history.push({
                        pathname: '/detailedJobView',
                        state: { job: response.data }
                    });

                } else {
                    alert('job details  not retrieved successfully ');
                }
            })
            .catch(err => {
                alert('job err not found');
            })
        //   this.setState({job:data})
    }

    render() {



        return (
            <div>
                <SideNav />
                <div style={{  }}>
                <div className="reportcontainer" >
                <div>
                {/* <div ><b><i>smartU</i></b></div> */}
                <div class="first">
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                </div>
                
                </div>
                
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
