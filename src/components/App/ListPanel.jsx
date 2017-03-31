"use strict";

import React from "react";
import {Link} from "react-router";

export default function ListPanel ( props ) {
    const active = {
        "borderTop": "2px solid white",
        "opacity": "0.90",
        "color": "limegreen"
    };
    return (
      <div className = "panel panel-style">
          <nav className = "nav-style">
              <Link to = "todo-list" activeStyle={active}><li> Todo List </li></Link>
              <Link to = "completed-list" activeStyle={active}><li> Completed List </li></Link>
              <i onClick = {props.showSettings} className="fa fa-cog"
                aria-hidden="true"></i>
          </nav>
          <ul className = "settings">
            <li onClick = {props.removeAuthorization}>
              Logout
            </li>
            <li>
              <Link to = "/account-settings"> Account Settings </Link>
            </li>
          </ul>
      </div>
    );

}
