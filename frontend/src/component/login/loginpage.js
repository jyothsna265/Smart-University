import React, { Component } from 'react';
import Footer from './footer';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/actionCreators';
import LoginForm from './loginForm';
import RegisterForm from './registerForm';
import { nodeURL } from '../../config';

class Loginpage extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        errMsg: '',
    }
    register = (values) => {
        console.log(values);
        if (values.type === undefined) {
            values.type = "0";
        }
        values["fullname"] = values["firstname"] + values["lastname"]
        axios.defaults.withCredentials = true;
        axios.post(nodeURL + `/signup`, values)
            .then(response => {
                this.props.fetchLogin(response);
                if (response.status === 200) {
                    this.props.history.push('/homepage');
                    console.log("data", response.data);
                } else {
                    this.setState({ errMsg: 'Email ID already exists' });
                }
            })
            .catch(err => {
                this.setState({ errMsg: 'Email ID already exists' });
            })
    }
    login = (values) => {
        //e.preventDefault();
        //let values = formHandle(this.loginform);
        console.log(nodeURL);
        axios.defaults.withCredentials = true;
        axios.post(nodeURL + `/signin`, values)
            .then(response => {
                console.log(response.data)
                this.props.fetchLogin(response);
                console.log(response);
                if (response.status === 200) {
                    console.log("in login history", this.props.history);
                    localStorage.setItem('currentUser', JSON.stringify(this.props.login.loginData))
                    this.props.history.push('/homepage');

                } else {
                    alert('Username/Password is wrong.');
                }
            })
            .catch(err => {
                alert('Username/Password is wrong.');
            })
    }
    componentDidMount() {


    }
    render() {
        return (
            <div className="container-nav">
                <nav className="navbar navbar-inverse" style={{ backgroundColor: "orange" }}>
                    <div className="container">
                        <div className="navbar-header">
                            <div><h1 style={{ marginLeft: "-200px", color: "#black", fontFamily: "", fontSize:"30px" }}><b><i>smartU</i></b></h1></div>
                        </div>
                        <LoginForm onSubmit={this.login} />
                        <div></div>
                    </div>
                </nav>
                <div className="container-fluid Main">
                    <div className="col-sm-offset-4 col-sm-4 col-sm-offset-4" style={{ background: "white", marginBottom: '100px', marginTop: "-180px", width: "50%" }}>
                        <h3 className="title text-center" style={{ color: "orange" }}><b>Be Great at what you do</b></h3>
                        <h4 className="subtitle text-center"  ><b style={{ color: "" }}>Let's get started</b></h4>
                        <div style={{ border: "1px solid grey", marginBottom: "10px" }}></div>
                        {(this.state.errMsg !== "") ?
                            <div className="alert alert-danger fade in">
                                <a href="#" className="close" data-dismiss="alert"></a>
                                <strong>Error!</strong> {this.state.errMsg}
                            </div> : null}
                        <RegisterForm onSubmit={this.register} />
                    </div>
                    <Footer />
                </div>

            </div>
        )
    }
}
function mapStateToProps(state) {
    return { login: state.login, error: state.login.error }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Loginpage);
