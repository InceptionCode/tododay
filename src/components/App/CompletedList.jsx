"use strict";
import React, {Component} from "react";
import axios from "axios";
import ListPanel from "./ListPanel.jsx";
import { deleteTodo, uncompleteTodo } from "../../Utils/api.js";
const url ="http://67.205.174.156:3000/todos?completed=1";

export default class CompletedList extends Component {
    componentWillMount () {

        this.props.getTodos( url, "completed" );

    }
    constructor () {

        super();
        this.state ={
            todos: []
        };

	this.deleteTodo = deleteTodo.bind(this);
	this.uncompleteTodo = uncompleteTodo.bind(this);
    }
    render () {
	
	const renderList = 
                this.props.completed.map( todo => {

                    return (
                      <li className="completed"
                          onClick = {()=> this.uncompleteTodo( todo.id )}
                          key = {todo.id}>
                          <span />
                          {todo.description}
                          <i onClick = {()=>this.deleteTodo( todo.id )}
                          className = "fa fa-trash" aria-hidden = "true" />
                       </li>
                    );
	} );

	const renderServerDown = 
		<div className="server-down">
                    <strong>{this.props.todos}</strong>
           	    <i className="fa fa-server" aria-hidden="true"></i>
           	    <i className="fa fa-frown-o" aria-hidden="true"></i>
		</div>;

        return (
          <div className = "todo-list">
              <ListPanel removeAuthorization= {this.props.removeAuthorization}
                         showSettings= {this.props.showSettings}/>
              <ul className = "list-display">
                  { (this.props.completed.map) ? renderList : renderServerDown }
              </ul>
          </div>
        );

    }
}
