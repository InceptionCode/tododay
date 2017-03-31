import React, { Component } from "react";
import { Link } from "react-router";
import { inputsChange } from "../../Utils/utils.js";
import { loginUser, loginErrorHandler } from "../../Utils/api.js";

export default class SignIn extends Component {

    constructor ( props ) {

        super( props );
        this.state ={
            email:"",
            password:"",
            responseMessage: "",
        };

        this.inputsChange = inputsChange.bind( this );
        this.loginUser = loginUser.bind( this );
	this.loginErrorHandler = loginErrorHandler.bind( this );

    }	 


    render() {
	
	const openning = 
            <div className= "openning">
              <h1>To-Do Day</h1>
              <h2>Don't just live today "DO" today.</h2>
              <blockquote>
                “If you go to work on your goals, your goals will go to work on you.
                If you go to work on your plan, your plan will go to work on you.
                Whatever good things we build end up building us.”
                <br/>
                <cite>—Jim Rohn</cite>
              </blockquote>
                <h2> So build your day!</h2>
		<br/>
		<p> Created by: <a href = "http://darrellwashingtonjr.com" target = "blank"> Inception Code </a> </p>
                <Link to = "/sign-up">
                  <button className = "sign-up"> Sign Up</button>
                </Link>
              <i className="fa fa-list-alt" aria-hidden="true"></i>
            </div>;

	const showHideResponse = 
                ( this.state.responseMessage.length >=1 ) ? "show-response" : "null";

	const signInForm = 
            <section className = "signin-form">
              <div className = "signin-response"
                id = { showHideResponse }>
                <h2> Opps somethings not right </h2>
                <p> {this.state.responseMessage} </p>
              </div>
              <form onSubmit = {this.loginUser}>
                <label htmlFor="email"> Email </label><br/>
                <input onChange = {this.inputsChange}
                  type= "email" placeholder = "Email"
                  value ={this.state.email} id= "email" required/>
                <br/>
                <label htmlFor="password"> Password </label><br/>
                <input onChange = {this.inputsChange}
                  type= "password" placeholder = "Password"
                  value={this.state.password} id= "username" required/><br/>
                 <br/>
                <button className = "submit-signin"> Login </button>
              </form>
            </section>;
        return (
          <div>
	    { openning }
	    { signInForm }
          </div>
        );

    }
}
/*When you are ready to include a forgotten password method add this line
above the last <br> <a href="#" className='forgot'> Forgot Password?</a> */
