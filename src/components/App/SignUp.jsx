import React, { Component } from "react";
import { Link, Router } from "react-router";
import axios from "axios";
const url ="http://localhost:3000/signup";

export default class SignUp extends Component {

    constructor () {

        super ();

        this.state ={
            email_input:"",
            password_input:"",
            confirm_password: "",
            password_error: ""
        };

        this.emailChange =this.emailChange.bind( this );
        this.passwordChange =this.passwordChange.bind( this );
        this.confirmPassword =this.confirmPassword.bind( this );
        this.submitSignup =this.submitSignup.bind( this );

    }

    emailChange ( e ) {

        this.setState( {
            email_input: e.target.value
        } );

    }

    passwordChange ( e ) {

        this.setState( {
            password_input: e.target.value
        } );

    }

    confirmPassword ( e ) {

        this.setState( {
            confirm_password: e.target.value
        } );

    }

    submitSignup ( e ) {

        let email =this.state.email_input,
            password =this.state.password_input,
            confirmPassword =this.state.confirm_password;

        e.preventDefault();
        const data ={
                email: email,
                password: confirmPassword
            },
            request ={
                url: url,
                method: "POST",
                data: data
            };
        if ( password ===confirmPassword ) {

            axios( request )
              .then( () => {

                  this.context.router.push( "/Todo-List" );

              },err => {

                  let errorMessage =err.response.data.message;

                  this.setState( {
                      password_error: errorMessage
                  } );

              } );

        } else {

            this.setState( {
                password_error: "Opps seems like the passwords don\'t match. Try again."
            } );

        }

    }

    render () {

        return (
          <div>
            <section className = "signup-form">
              <h1> Let's start making things happen! </h1>
              <form onSubmit = {this.submitSignup}>
                <div>
                  <label htmlFor = "signup-email"> Email </label><br/>
                  <input onChange = {this.emailChange} type = "email"
                    placeholder = "Email" id="signup-email"
                    value = {this.state.email_input} required/><br/>
                  <label htmlFor = "signup-password"> Password </label><br/>
                  <input onChange = {this.passwordChange} type = "password"
                    placeholder = "Password" id= "signup-password"
                    value = {this.state.password_input} required/>
                  <input onChange = {this.confirmPassword} type = "password"
                    placeholder = "Confirm password"
                    className = {
                      ( this.state.confirm_password !==this.state.password_input )
                      ? "unconfirmed" : "null"
                    }
                    id= "confirm-password"
                    value = {this.state.confirm_password} required/>
                </div>
                <p> {this.state.password_error}</p>
                <br/>
                <button className = "submit-signup"> Submit </button>
              </form>
            </section>
          </div>
        );

    }
}

SignUp.contextTypes ={

    router: React.PropTypes.object
    
};
