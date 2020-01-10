import React from 'react';
import { Field,reduxForm} from 'redux-form';
import {connect} from 'react-redux';

const fields = ['email','password']

//Validations
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;

const required = value => (value || typeof value === '' ? undefined : 'Required');

const renderField = ({
    input,
    label,
    type,
    placeholder,
    meta: { touched, error, warning }
  }) => (
    <div>   
      <div>
        <input {...input} className="form-control" type={type} placeholder={placeholder}/>
      </div>
      <div className="text-danger">
      {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
        </div>
    </div>
  )
//Form
let LoginForm = props => {
    const {handleSubmit,pristine, reset, submitting } = props;
    return (
        <form  onSubmit={handleSubmit} className="nav navbar-nav navbar-right form-inline" style={{marginRight: "100px", marginTop:"10px"}}>           
            <div className="form-group">
                <Field type="email" component={renderField} name="emailID" placeholder="Email" validate={[required, email]}/>
            </div>
            <div className="form-group" style={{paddingLeft:"10px"}}>
                <Field type="password" component={renderField} name="password" placeholder="Password" validate={[required]}/>
            </div>
        <button type="submit" className="btn btn-default logbutton" style={{marginLeft:"10px",background:'transparent',color:'white'}}>Sign In</button>
        <a href="#" style={{color:"white",paddingLeft:"10px"}}>Forgot Password</a>
        </form>
    )
}

LoginForm = reduxForm({
    // a unique name for the form
    form: 'loginform',
    // initialValues: data,     
})(LoginForm)

export default LoginForm;