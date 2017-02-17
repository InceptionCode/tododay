import React, { Component } from "react";
import { Router, Route, IndexRoute, hashHistory, browserHistory } from "react-router";
import axios from "axios";
import jwt from "jsonwebtoken";

export default class Container extends Component {

    checkForToken () {

        if ( localStorage.token ) {

            this.setState( {
                token: localStorage.token,
                isAuthenticated: true
            } );

        }

    }
    getTodos ( url, todosType ) {

        const USER_INFO =jwt.decode( this.state.token );

        axios.get( url +`&id=${USER_INFO.id}` )
        .then( result => {

            let list =result.data;
            if ( todosType ==="uncompleted" ) {

                this.setState( { todos: list } );

            } else if ( todosType ==="completed" ) {

                this.setState( { completed: list } );

            }

        }, err => {

            if( err.message === "Network Error") {
                let networkDownMessage ="Sorry the server seems to be down, try again later";
                this.setState( {
                    todos: networkDownMessage,
                    completed: networkDownMessage

                });

            }
            console.log( err );

        } );

    }
    componentWillMount () {

        this.checkForToken();

    }
    constructor ( ) {

        super( );
        this.state ={

            todos: [],
            completed: [],
            textarea: { description:"" },
            isAuthenticated: false,
            token: ""
        };

        this.change =this.onChange.bind( this );
        this.add =this.addTodo.bind( this );
        this.delete =this.deleteTodo.bind( this );
        this.edit =this.editTodo.bind( this  );
        this.completeTodo =this.completeTodo.bind( this );
        this.showSettings =this.showSettings.bind( this );
        this.setAuthAndToken =this.setAuthAndToken.bind( this );
        this.checkForAuth =this.checkForAuth.bind( this );
        this.removeAuthorization =this.removeAuthorization.bind( this );
        this.getTodos =this.getTodos.bind( this );

    }

    onChange ( e ) {

        this.setState( {
            textarea: { description: e.target.value },
        } );

    }

    editTodo ( item ) {

        this.setState( {
            textarea: { description: item.description },
            editTodoId: item.id
        } );

    }

    postRequest ( request ) {

        let todos =this.state.todos;
        axios( request )
          .then( response =>{

              todos.push( response.data[0] );
              this.setState( {
                  textarea: { description:"" },
                  todos: todos

              } );

          }, err => console.log( err  ) );
    }

    insertTodo () {

        let user =jwt.decode( this.state.token ),
            description =this.state.textarea.description,
            data ={ user_id: user.id, description };
        const request ={
            url: "http://localhost:3000/todos",
            method: "POST",
            data: data
        };
        this.postRequest( request );
    }

    tryRequest ( request ) {

        try {

            axios( request );

        } catch ( error ) {

            console.log( error );

        }

    }
    updateTodo () {

        let textarea =this.state.textarea,
            todos =this.state.todos,
            id =this.state.editTodoId,
            newTodos =todos.map( todo => {

                ( todo.id ===id ) ? todo.description =textarea.description : null;
                return todo;

            } );

        const request ={
            url: "http://localhost:3000/todos/" +id,
            method: "PUT",
            data: textarea
        };
        this.tryRequest( request );
        this.setState( {
            todos: newTodos,
            textarea: { description: "" },
            editTodoId: null
        } );

    }

    addTodo ( e ) {

        e.preventDefault();
        let editTodoId =this.state.editTodoId,
            textarea =this.state.textarea.description;

        if ( editTodoId &&textarea !=="" ) {

            return this.updateTodo();

        }else if ( textarea !=="" ) {

            return this.insertTodo();

        }

    }
    deleteTodo ( id ) {

        let todos =this.state.todos,
            newTodos =todos.filter( todo => todo.id !==id );

        const request ={
            url: "http://localhost:3000/todos/" +id,
            method: "DELETE"
        };
        this.tryRequest( request );
        this.setState( { todos: newTodos } );

    }

    completeTodo( e, id ) {

        let url ="http://localhost:3000/todos/" +id,
            completed;

        e.target.classList.toggle( "completed" );
        if ( e.target.classList.contains( "completed" ) ===false ) {

            completed ={ completed: 0 };

        } else {

            completed ={ completed: 1 };

        }
        const request ={
            url: url,
            method: "PUT",
            data: completed
        };
        if ( e.target.classList.contains( "fa" ) ===false ) {

            this.tryRequest( request );

        }
    }

    showSettings ( ) {

        let settings =document.querySelector( ".settings" );

        settings.classList.toggle( "show-settings" );

    }

    setAuthAndToken ( token ) {

        const isAuthenticated =this.state.isAuthenticated;
        localStorage.setItem( "token", token );
        this.setState( {
            isAuthenticated: !isAuthenticated,
            token: token
        } );

    }

    checkForAuth () {

        if ( !this.state.token &&!this.state.isAuthenticated ) {

            return;

        } else {

            this.context.router.push( "/todo-list" );

        }

    }

    removeAuthorization () {

        localStorage.clear();
        this.setState( {
            token: "",
            isAuthenticated: false
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
                  onChange: this.change,
                  addTodo: this.add,
                  deleteTodo: this.delete,
                  editTodo: this.edit,
                  completeTodo: this.completeTodo,
                  showSettings: this.showSettings,
                  setAuthAndToken: this.setAuthAndToken,
                  checkForAuth: this.checkForAuth,
                  removeAuthorization: this.removeAuthorization,
                  getTodos: this.getTodos
              } );

        return (
          <div>
            {child}
          </div>
        );

    }
}
Container.contextTypes ={
    router: React.PropTypes.object
};
