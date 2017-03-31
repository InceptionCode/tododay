import React, { Component } from "react";
import { inputsChange } from "../../Utils/utils.js";
import { prepareSignupRequest, makeSignupRequest } from "../../Utils/api.js";

export default class SignUp extends Component {

    constructor () {

        super ();

        this.state ={
            email:"",
            password:"",
            confirm_password: "",
            password_error: ""
        };

	this.inputsChange = inputsChange.bind(this);
        this.confirmPassword =this.confirmPassword.bind( this );
        this.prepareSignupRequest = prepareSignupRequest.bind( this );
	this.makeSignupRequest = makeSignupRequest.bind(this);

    }

    confirmPassword ( e ) {

        this.setState( {
            confirm_password: e.target.value
        } );

    }

    render () {

	const passwordCheck = 
                   ( this.state.confirm_password !==this.state.password )
                      	                    ? 
			        "unconfirmed" : "null";

    	const signupForm = 
	    <form onSubmit = {this.prepareSignupRequest}>
                <div>
                  <label htmlFor = "signup-email"> Email </label><br/>
                  <input onChange = {this.inputsChange} type = "email"
                    placeholder = "Email" id="signup-email"
                    value = {this.state.email} required/><br/>
                  <label htmlFor = "signup-password"> Password </label><br/>
                  <input onChange = {this.inputsChange} type = "password"
                    placeholder = "Password" id= "signup-password"
                    value = {this.state.password} required/>
                  <input onChange = {this.confirmPassword} type = "password"
                    placeholder = "Confirm password" 
	            className = { passwordCheck }
                    id= "confirm-password"
                    value = {this.state.confirm_password} required/>
                </div>
                <p> {this.state.password_error}</p>
                <br/>
                <button className = "submit-signup"> Submit </button>
            </form>;	

        return (
          <div>
            <section className = "signup-form">
              <h1> Let's start making things happen! </h1>
	      { signupForm }
            </section>
          </div>
        );

    }
}

