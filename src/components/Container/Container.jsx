import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import jwt from "jsonwebtoken";
import { tryRequest, showSettings, removeHelp } from "../../Utils/utils.js";
import { checkToken, setAuthAndToken, removeAuthorization } from "../../Utils/auth.js";
import { postRequest, getTodos, addTodo, editTodo, deleteTodo, completeTodo, updateTodo, insertTodo } from "../../Utils/api.js";

export default class Container extends Component {

    componentWillMount () {

        this.checkToken();

    }
    constructor ( ) {

        super( );
        this.state ={

            todos: [],
            completed: [],
            textarea: { description:"" },
            isAuthenticated: false,
            token: "",
	    helperClass:"user-help"
        };

        this.change =this.onChange.bind( this );
	this.postRequest = postRequest.bind(this);
        this.add = addTodo.bind( this );
        this.delete = deleteTodo.bind( this );
        this.edit = editTodo.bind( this  );
        this.completeTodo = completeTodo.bind( this );
	this.insertTodo = insertTodo.bind(this);
	this.updateTodo = updateTodo.bind(this);
	this.checkToken = checkToken.bind(this);
        this.setAuthAndToken = setAuthAndToken.bind( this );
        this.removeAuthorization = removeAuthorization.bind( this );
        this.getTodos = getTodos.bind( this );
	this.removeHelp = removeHelp.bind( this );

    }

    onChange ( e ) {

        this.setState( {
            textarea: { description: e.target.value },
        } );

    }


    render () {

        const { children } =this.props,
            child =React.cloneElement(
              children, {
                  isAuthenticated: this.state.isAuthenticated,
                  token: this.state.token,
                  todos: this.state.todos,
                  completed: this.state.completed,
                  textarea: this.state.textarea,
                  helperClass: this.state.helperClass,
                  onChange: this.change,
                  addTodo: this.add,
                  deleteTodo: this.delete,
                  editTodo: this.edit,
                  completeTodo: this.completeTodo,
                  showSettings: showSettings,
                  setAuthAndToken: this.setAuthAndToken,
                  removeAuthorization: this.removeAuthorization,
                  getTodos: this.getTodos,
		  removeHelp: this.removeHelp
              } );

        return (
          <div>
            {child}
          </div>
        );

    }
}

Container.contextTypes = {
  router: React.PropTypes.object
};
