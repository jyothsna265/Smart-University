import React, { Component } from 'react';
import axios from 'axios';
import './Userprofile.css';
import { nodeURL } from '../../config';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/actionCreators';
import { Redirect, Link } from 'react-router-dom';
import SideNav from '../login/sidenav';

class Userprofile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            aboutme: "",
            address: "",
            program: "",
            jobdesc: "",
            company: "",
            major: "",
            languages: "",
            gender: "",
            phonenum: "",
            emailID: "",
            successMsg: "",
            userProfileFlag: false,
            file: null,
            output: null,
            picture: null
        }
        //Bind the handlers to this class
        //this.firstnameChangeHandler = this.firstnameChangeHandler.bind(this);
        //this.lastnameChangeHandler = this.lastnameChangeHandler.bind(this);
        this.aboutmeChangeHandler = this.aboutmeChangeHandler.bind(this);
        this.addressChangeHandler = this.addressChangeHandler.bind(this);
        this.programChangeHandler = this.programChangeHandler.bind(this);
        this.jobdescChangeHandler = this.jobdescChangeHandler.bind(this);
        this.companyChangeHandler = this.companyChangeHandler.bind(this);
        this.majorChangeHandler = this.majorChangeHandler.bind(this);
        this.languagesChangeHandler = this.languagesChangeHandler.bind(this);
        this.genderChangeHandler = this.genderChangeHandler.bind(this);
        this.phonenumChangeHandler = this.phonenumChangeHandler.bind(this);
        //this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }

    componentDidMount() {
        console.log("inside componentDidMount");
        axios.get(nodeURL + `/fetchpicture`, {
            params: {
                id: this.props.login.emailID
            }
        })
            .then(res => {
                this.setState({
                    output: res.data.dbprofilepic,
                    aboutme: res.data.dbaboutme,
                    address: res.data.dbaddress,
                    program: res.data.dbprogram,
                    major: res.data.dbmajor,
                    languages: res.data.dblanguages,
                    gender: res.data.dbgender,
                    phonenum: res.data.dbphonenum,
                    jobdesc: res.data.dbjobdesc,
                    company: res.data.dbcompany
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    //aboutme change handler to update state variable with the text entered by the user
    aboutmeChangeHandler = (e) => {
        this.setState({
            aboutme: e.target.value
        })
    }
    //address change handler to update state variable with the text entered by the user
    addressChangeHandler = (e) => {
        this.setState({
            address: e.target.value
        })
    }
    //program change handler to update state variable with the text entered by the user
    programChangeHandler = (e) => {
        this.setState({
            program: e.target.value
        })
    }
    //jobdesc change handler to update state variable with the text entered by the user
    jobdescChangeHandler = (e) => {
        this.setState({
            jobdesc: e.target.value
        })
    }
    //major change handler to update state variable with the text entered by the user
    majorChangeHandler = (e) => {
        this.setState({
            major: e.target.value
        })
    }
    //languages change handler to update state variable with the text entered by the user
    languagesChangeHandler = (e) => {
        this.setState({
            languages: e.target.value
        })
    }
    //gender change handler to update state variable with the text entered by the user
    genderChangeHandler = (e) => {
        this.setState({
            gender: e.target.value
        })
    }
    //phonenum change handler to update state variable with the text entered by the user
    phonenumChangeHandler = (e) => {
        this.setState({
            phonenum: e.target.value
        })
    }


    companyChangeHandler = (e) => {
        this.setState({
            company: e.target.value
        })
    }

    handleFileUpload = event => {
        this.setState({ file: event.target.files[0] });
    };

    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        console.log("button clicked");
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        console.log("login data", this.props.login)
        const data = {
            firstname: this.props.login.firstname,
            lastname: this.props.login.lastname,
            aboutme: this.state.aboutme,
            address: this.state.address,
            program: this.state.program,
            jobdesc: this.state.jobdesc,
            company: this.state.company,
            major: this.state.major,
            languages: this.state.languages,
            gender: this.state.gender,
            phonenum: this.state.phonenum,
            emailID: this.props.login.emailID
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(nodeURL + `/Userprofile`, data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setState({
                        userProfileFlag: true,
                        successMsg: "Profile information is successfully updated"
                    })
                } else {
                    this.setState({
                        userProfileFlag: false,
                        successMsg: "Profile information is not updated"
                    })
                }
            });
    }

    submitFile = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.file);
        formData.append('emailID', this.props.login.emailID);

        //for (var value of formData.values()) {
        //console.log(value);
        //}

        console.log("this.props.login.emailID ", this.props.login.emailID);
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(nodeURL + `/fileupload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(response => {
                console.log(
                    "Image has been saved to bucket. URL = ", response.data);
                this.setState({
                    output: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });

    }

    render() {
        console.log("Output file: ", this.state.output);
        const url = this.state.output;
        return (
            <div> 
                <SideNav />
            <div class="user-first-div">
                {/*/profilepictureupload */}
                <div class="modal-body4">
                    <form>
                        <img height="200px" width="200px" src={url} style={{ marginTop: "50px", marginLeft: "180px", border: "1px solid grey", borderRadius: "100%" }}></img><br />
                        <div class="profpicbuttons">
                            <div class="choosefile"><br /><input label="upload file" type="file" onChange={this.handleFileUpload} style={{ float: "left", marginTop: "15px", marginLeft: "85px" }} /></div>
                            <div class="upload"><button type="submit" className="btn btn-primary" onClick={this.submitFile} style={{ float: "left", marginTop: "-25px", marginLeft: "370px", backgroundColor: "orange", borderColor: "orange", color: "black", width: "20%" }} >Upload</button></div>
                        </div>
                    </form>
                </div>
                {/*//user data form------------------------------------------------------------------------------------------------------------------------------------------ */}
                <div class="section">
                    <div class="user-form">
                        <div class="user-main-div">
                            <div class="container">
                                <div class="user-ad-left">
                                    <h2 style={{marginLeft: "420px", color: "white"}}>Profile Information</h2>
                                    <div class="form-group">
                                        <input type="text" class="form-control" name="firstname" placeholder="First Name" value={this.props.login.firstname} />
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" name="lastname" placeholder="Last Name" value={this.props.login.lastname} />
                                    </div>
                                    <div class="form-group">
                                        <input onChange={this.aboutmeChangeHandler} type="text" class="form-control1" name="aboutme" placeholder="About Me" value={this.state.aboutme} />
                                    </div>
                                    <div class="form-group">
                                        <input onChange={this.addressChangeHandler} type="text" class="form-control" name="address" placeholder="Address" value={this.state.address} />
                                    </div>
                                    <div class="form-group">
                                        <input onChange={this.programChangeHandler} type="text" class="form-control" name="program" placeholder="Program" value={this.state.program} />
                                    </div>
                                    <div class="form-group">
                                        <input onChange={this.majorChangeHandler} type="text" class="form-control" name="major" placeholder="Major" value={this.state.major} />
                                    </div>
                                    <div class="form-group" style={this.props.login.type == '1' ? { display: "block" } : { display: "none" }}>
                                        <input onChange={this.jobdescChangeHandler} type="text" class="form-control" name="jobdesc" placeholder="Job Description" value={this.state.jobdesc} />
                                    </div>
                                    <div class="form-group" style={this.props.login.type == '1' ? { display: "block" } : { display: "none" }}>
                                        <input onChange={this.companyChangeHandler} type="text" class="form-control" name="company" placeholder="Company working for" value={this.state.company} />
                                    </div>
                                    <div class="form-group">
                                        <input onChange={this.languagesChangeHandler} type="text" class="form-control" name="languages" placeholder="Languages" value={this.state.languages} />
                                    </div>
                                    <div class="form-group">
                                        <input onChange={this.genderChangeHandler} type="text" class="form-control" name="gender" placeholder="Gender" value={this.state.gender} />
                                    </div>

                                    <div class="form-group">
                                        <input onChange={this.phonenumChangeHandler} type="text" class="form-control" name="phonenum" placeholder="Phone number" value={this.state.phonenum} />
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" name="emailID" placeholder="Email ID" value={this.props.login.emailID} />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <button onClick={this.submitLogin} class="user-btn">Save Changes</button>
                        <div class="userprofile-successmsg">
                            {this.state.successMsg}
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

export default connect(mapStateToProps, mapDispatchToProps)(Userprofile);