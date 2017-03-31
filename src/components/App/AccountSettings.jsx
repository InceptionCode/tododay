import React, { Component } from "react";
import { Link } from "react-router";
import axios from "axios";
import jwt from "jsonwebtoken";
import ListPanel from "./ListPanel.jsx";

export default class AccountSettings extends Component {
    
    render () {

        const user = jwt.decode(this.props.token),
            userEmail = user.email,
            userPassword = user.password;
        return (
        <div className = "account-div">
          <ListPanel removeAuthorization= {this.props.removeAuthorization}
            showSettings= {this.props.showSettings}/>
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
