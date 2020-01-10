import React, { Component } from 'react';
import axios from 'axios';
import {nodeURL} from '../../config';
// import Header from '../header';
import { connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/actionCreators';
import {Redirect,Link} from 'react-router-dom';
import { callbackify } from 'util';
import SideNav from '../login/sidenav';
import './Aoiform.css';

class Aoiform extends Component {
    constructor() {
        super();
        this.state = {
            enrollStatus: " ",
            admitStatus: " ",
            aoi: " ",
            other: " ",
            major: " ",
            currentsem: " ",
            flag: false,
            coursedetails: []

        };
    // this.applyChangeHandler = this.applyChangeHandler.bind(this)
    // this.callback = this.callback.bind(this);

    }

    
    enrollStatusChangeHandler = e => this.setState({enrollStatus: e.target.value})
    admitStatusChangeHandler = e => this.setState({admitStatus: e.target.value})
    aoiChangeHandler = e => this.setState({aoi: e.target.value})
    jobIDChangeHandler = e => this.setState({jobid: e.target.value})
    otherChangeHandler = e => this.setState({other: e.target.value})
    currentsemHandler = e => this.setState({currentsem: e.target.value})
    majorHandler = e => this.setState({major: e.target.value})
    // applyChangeHandler(e){
    //   this.setState({apply: e.target.value})
    // }

  //   callback(response){
  //     response.data.map(input => {
  //       axios.get(nodeURL+`/getProfessor`, {
  //               params: {
  //                   id: input.courseid
  //               }
  //           }).then()
  //     }
  //     )
  //  }

    submit = e => {
      console.log(this.state.output);
     var headers = new Headers();
     //prevent page from refresh
     e.preventDefault();
    //  if(this.state.apply === 'Yes')
    //  this.setState
    console.log("Email",this.props.login)
     const data = {
                // "user_email": this.props.login.emailID,
                "major": this.state.major,        
                "enrollStatus": this.state.enrollStatus,
                "admitStatus": this.state.admitStatus,
                "aoi": this.state.aoi,
                "other": this.state.other,
                "currentsem": this.state.currentsem
                
           
     };
     console.log("the concatenated input", data);
     //set the with credentials to true
     axios.defaults.withCredentials = true;


     //my code
    //  axios.post(nodeURL+`/searchCourses`, data).then(response => {
    //    response.data.map((input) => {
    //      this.callback(input);
    //    })
    //  }).catch((err) => {
    //    throw err;
    //  })











     //make a post request with the user data
     axios.post(nodeURL+`/searchCourses`, data).then(response => {
       response.data.map(input => {
         input.proffname = [];
         input.load = [];
         axios.get(nodeURL+`/getProfessor`, {
          params: {
              id: input.courseid
          }
      }).then(output => {
          // console.log("op"+JSON.stringify(output));
          output.data.map(value => {
            console.log("input-type: " + typeof(input))
            console.log("input1: " + JSON.stringify(input))
            input.proffname.push(value.profname);
            input.load.push(value.load);
            console.log("input2: " + JSON.stringify(input))
          })
        }).then((answer)=> {
          this.setState({
            coursedetails: response.data
          }
          )
          this.setState({
            flag: true
          }
          )
        })
        .catch(err => {
          console.log("err: " + err);
        })
       });
         
  
     });
   };

  render() {
    const coursefeedback = this.state.coursedetails.map(course => {
          // console.log("proff",course); 
          var loadlength = course.load.length;
          var length = course.proffname.length;
          const proffdata = course.proffname.map(proff => {
            return(
            <tr style={{borderBottom: "1px solid #F1F1F1" }}>
            <div style= {{borderBottom:"1px solid #F1F1F1",width:"150px",color:"white"}}> {proff} </div>   
            </tr>
            )
          })
          const loaddata = course.load.map(load => {
            return (
              <tr style= {{border:"1px solid #F1F1F1"}}>
            <div style= {{borderBottom:"1px solid #F1F1F1",width:"150px",color:"white"}}> {load} </div>   
              </tr>
            )
           
          })
          return (
            <div>
              <tbody class="userbody" style={{height: "50px", border:"1px solid #F1F1F1"}}>
            <tr style={{border:"1px solid #F1F1F1", height:"50px", }}>
            <td style={{border:"1px solid #F1F1F1", width:"100px"}}>
             <div style={ course.type == "mandatory" ? {color:"#0072b1"} :{color:"#0072b1"} } > <p>{course.courseid}</p></div>   
            </td>
            <td style={{border:"1px solid #F1F1F1", width:"300px"}}>
             <div style={{color:"white"}}>{course.name} </div>   
            </td>
                <td style={{border:"1px solid #F1F1F1", width:"100px"}}>
                <div style={{color:"white"}}> {course.category} </div>   
                </td>
                
                <td style={{border:"1px solid #F1F1F1", width:"100px"}}>
                <div style={ course.type == "mandatory" ? {color:"#3CB371"} :{color:"#FF4500"} }> <p>{course.type}</p></div>   
                </td>
                <td style={{border:"1px solid #F1F1F1", width:"150px"}}>
                <div >{proffdata} </div>   
                </td> 
                <td  style={{border:"1px solid #F1F1F1", width:"150px"}}>
                {loaddata}
                </td>

            </tr>  
            
        </tbody>
            </div>
          )
      })
  return(
    <div>
    <SideNav />

    <div style ={{paddingLeft: "150px",paddingTop:"30px"}} class="aoiform-maindiv">

    <div style={ this.state.flag ? {display:"none"} :{display:"block"} }>
    <form method="post" action="" role="form" class="formstyle"> 
    <div className="form-group" style={{  width: "94%" }}>
            <label for="authorization" style={{ marginTop: "20px", color: "white", fontFamily: "sans-serif"}}><h4><b>Student :</b></h4></label>
            <span style={{paddingLeft:"20px"}}><input type="radio" style={{paddingLeft:"20px", color: "white"}} onChange={this.enrollStatusChangeHandler} name="enrollStatus" value="Enrolled"/><b style={{color: "white", fontFamily: "sans-serif"}}> Enrolled</b></span>
            <span style={{paddingLeft:"20px"}}><input type="radio" style={{paddingLeft:"50px", color: "white"}} onChange={this.enrollStatusChangeHandler} name="enrollStatus" value="NotEnrolled"/> <b style={{color: "white", fontFamily: "sans-serif"}}> Not Enrolled </b></span>
    </div>
    <div class="form-group" style = {{width : "60%", color: "white", fontFamily: "sans-serif"}}>
    <label for="major">Current Semestar</label>
    <select  class="form-control" id="major" onChange={this.currentsemHandler}>
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>N/A</option>
    </select>
    </div>
    <div className="form-group" style={{  width: "94%" }}>
            <label for="authorization" style={{ marginTop: "20px"}}><h4><b style={{color: "white", fontFamily: "sans-serif"}}>Admit  :</b></h4></label>
            <span style={{paddingLeft:"20px"}}><input type="radio" style={{paddingLeft:"20px"}} onChange={this.admitStatusChangeHandler} name="admitStatus" value="classified"/><b style={{color: "white", fontFamily: "sans-serif"}} > Classified</b></span>
            <span style={{paddingLeft:"20px"}}><input type="radio" style={{paddingLeft:"50px"}} onChange={this.admitStatusChangeHandler} name="admitStatus" value="conditional"/> <b style={{color: "white", fontFamily: "sans-serif"}}> Conditional Classified </b></span>
    </div>
    <div class="form-group" style = {{width : "60%"}}>
    <label for="major" style={{color: "white", fontFamily: "sans-serif"}}>Major</label>
    <select  class="form-control" id="major" onChange={this.majorHandler}> 
      <option>Aerospace Engineering</option>
      <option>Biomedical Engineering</option>
      <option>Chemical Engineering</option>
      <option>Civil Engineering</option>
      <option>Computer Engineering</option>
      <option>Electrical Engineering</option>
      <option>General Engineering</option>
      <option>Human  Factors/Ergonomics</option>
      <option>Industrial and Systems Engineering</option>
      <option>Materials Engineering</option>
      <option>Mechanical Engineering</option>
      <option>Quality Assurance</option>
      <option>Software Engineering</option>
    </select>
  </div>
    <div class="form-group form-control-sm" style = {{width : "60%"}}>
      <label for="rg-from" style={{color: "white", fontFamily: "sans-serif"}}>Area Of Interest</label>
      <input type="text" id="rg-to" name="rg-to"  class="form-control" placeholder="keyCourse" onChange={this.aoiChangeHandler} />
    </div>
  <div class="form-group">
    <label for="other" style={{color: "white", fontFamily: "sans-serif"}}>Other</label>
    <textarea class="form-control" id="otherdetails" rows="3" onChange = {this.otherChangeHandler} style={{width: "60%"}}></textarea>
  </div>
    </form>
    <br/>
    <button type="submit" class="btn btn-primary" style={{backgroundColor:"orange", borderColor: "orange", width: "20%", borderRadius: "100px", height: "40px", color: "black", fontFamily: "sans-serif" }} onClick = {this.submit}>Submit</button>
      <div style={{paddingBottom: "150px"}}>
      </div>
    </div>
    <div style={ this.state.flag ? {display:"block"} :{display:"none"} }>
    <table className="userreport" style={{  fontWeight: "normal",textAlign:"center",backgroundColor:""}}>
            <thead>
                <tr style={{border:"1px solid black" , height:"50px", color: "white", fontFamily: "sans-serif"}}>
                    <th style={{border:"1px solid #F1F1F1", width:"100px"}}><p ><center>Courseid</center></p></th>
                    <th style={{border:"1px solid #F1F1F1", width:"300px"}}><p><center>Name</center></p></th>
                    <th style={{border:"1px solid #F1F1F1", width:"100px"}}><p><center>Category</center></p></th> 
                    <th style={{border:"1px solid #F1F1F1", width:"100px"}}><p><center>Type</center></p></th>
                    <th style={{border:"1px solid #F1F1F1", width:"168px"}}><p><center>Professsor</center></p></th>
                    <th style={{border:"1px solid #F1F1F1", width:"168px"}}><p><center>Load</center></p></th>
                    {/* <th style={this.props.login.type=='1'?{display:"none"}:{border:"1px solid #F1F1F1",width:"200px"}} rowSpan="2"><h4><center>FinalInterview</center></h4></th>
                    <th style={{border:"1px solid #F1F1F1",width:"200px"}}><h4><center>Status</center></h4></th> */}
                </tr>
            </thead>
            </table>
      {coursefeedback}
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

export default connect(mapStateToProps,mapDispatchToProps)(Aoiform);
