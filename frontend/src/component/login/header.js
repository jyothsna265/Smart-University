import React, { Component } from 'react';
import { Redirect, Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/actionCreators';
import axios from 'axios';
import { nodeURL } from '../../config';
import './header.css';

class Header extends Component {

    state = {
        logoutwsitch: false
    }

   
    render() {
        
        return (
            <div class="firstdiv">
                <div className="container-nav">
                    <nav className="navbar navbar-inverse" style={{ backgroundColor: "orange" }}>
                        <div className="container">
                            <div className="navbar-header">
                                <div className="row text-center" style={{ marginTop: "-10px" }}>
                                    <div className="navbar-header">
                                        <div style={{ marginLeft: "-140px", fontFamily: "'Times New Roman', Times, serif", fontSize:"30px" }}><b><i>smartU</i></b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
