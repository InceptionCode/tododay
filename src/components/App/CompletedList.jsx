"use strict";
import React, {Component} from "react";
import axios from "axios";
import ListPanel from "./ListPanel.jsx";
const url ="http://localhost:3000/todos?completed=1";

export default class CompletedList extends Component {
    componentWillMount () {

        this.props.getTodos( url, "completed" );

    }
    constructor () {

        super();
        this.state ={
            todos: []
        };

    }
    deleteTodo ( id ) {

        let todos =this.state.todos,
            newTodos =todos.filter( todo => todo.id !==id );
        const request ={
            url: "http://localhost:3000/todos/" +id,
            method: "DELETE"
        };
        try {

            axios( request );

        } catch ( error ) {

            console.log( error );

        }
        this.setState( { todos: newTodos } );

    }
    uncompleteTodo( id ) {

        const todos =this.state.todos,
            completed ={ completed: 0 },
            request ={
                url: "http://localhost:3000/todos/" +id,
                method: "PUT",
                data: completed
            };

        try {

            axios( request );

        } catch ( error ) {

            console.log( error );

        }
        let newTodos =todos.filter( todo => todo.id !==id );
        this.setState( {
            todos: newTodos
        } );

    }
    render () {

        return (
        <div className = "todo-list">
          <ListPanel />
            <ul className = "list-display">
              { (this.props.completed.map) ?
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

                } )
             : <div className="server-down">
                  <strong>{this.props.todos}</strong>
                  <i className="fa fa-server" aria-hidden="true"></i>
                  <i className="fa fa-frown-o" aria-hidden="true"></i>
               </div>
             }
          </ul>
        </div>
        );

    }
}
