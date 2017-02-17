import React, { Component } from "react";
import { Link, Router } from "react-router";
import axios from "axios";
import jwt from "jsonwebtoken";
import ListPanel from "./ListPanel.jsx";

export default class AccountSettings extends Component {

    componentWillMount () {

        if( !this.props.token && !this.props.isAuthenticated ) {

            return this.context.router.push( "/" );

        }else {

            return;

        }

    }
    render () {

        const user = jwt.decode(this.props.token),
            userEmail = user.email,
            userPassword = user.password;
        return (
        <div>
          <ListPanel />
          <h1>Account Settings</h1>
          <h2> Your Email </h2>
          <p> {userEmail} </p>
          <h2 onClick = {this.props.removeAuthorization}
            className = "leave-account">
            <Link to= "/"> Sign Out </Link>
          </h2>
          <h1 className ="coming-soon"> More Features Comming <strong> Soon. . . </strong> </h1>
        </div>

        );

    }

}

AccountSettings.contextTypes ={
    router: React.PropTypes.object
};
