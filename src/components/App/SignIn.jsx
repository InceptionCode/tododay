import React, { Component } from "react";
import { Link, Router } from "react-router";
import ListPanel from "./ListPanel.jsx";
import axios from "axios";

const url ="http://localhost:3000/";

export default class SignIn extends Component {

    constructor ( props ) {

        super( props );
        this.state ={
            email_input:"",
            password_input:"",
            responseMessage: "",
        };

        this.emailChange =this.emailChange.bind( this );
        this.passwordChange =this.passwordChange.bind( this );
        this.loginUser =this.loginUser.bind( this );

    }

    componentWillMount() {

        this.props.checkForAuth();

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

    loginUser ( e ) {

        e.preventDefault();
        const data ={
                email: this.state.email_input,
                password: this.state.password_input
            },
            request ={
                url: url +"auth",
                method: "POST",
                data: data
            };

        axios( request )
          .then( result => {

              let token =result.data.token;
              this.props.setAuthAndToken( token );
              this.context.router.push( "/todo-list" );

          }, err => {

              let responseMessage;
              if( err.message === "Network Error" ) {

                  responseMessage ="Sorry the server is down, try again later.";

              }else {

                  responseMessage =err.response.data;

              }
              this.setState( { responseMessage } );

          } );

    }

    render() {

        return (
          <div>
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
                <Link to = "/sign-up">
                  <button className = "sign-up"> Sign Up</button>
                </Link>
              <i className="fa fa-list-alt" aria-hidden="true"></i>
            </div>
            <section className = "signin-form">
              <div className = "signin-response"
                id = {
                ( this.state.responseMessage.length >=1 ) ? "show-response" : "null"
                }>
                <h2> Opps somethings not right </h2>
                <p> {this.state.responseMessage} </p>
              </div>
              <form onSubmit = {this.loginUser}>
                <label htmlFor="Email"> Email </label><br/>
                <input onChange = {this.emailChange}
                  type= "email" placeholder = "Email"
                  value ={this.state.email_input} id= "Email" required/>
                <br/>
                <label htmlFor="password"> Password </label><br/>
                <input onChange = {this.passwordChange}
                  type= "password" placeholder = "Password"
                  value={this.state.password_input} id= "username" required/><br/>
                 <br/>
                <button className = "submit-signin"> Login </button>
              </form>
            </section>
          </div>
        );

    }
}
/*When you are ready to include a forgotten password method add this line
above the last <br> <a href="#" className='forgot'> Forgot Password?</a> */
SignIn.contextTypes ={
    router: React.PropTypes.object
};
