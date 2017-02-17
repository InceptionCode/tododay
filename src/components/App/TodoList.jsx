import React , { Component } from "react";
import ListPanel from "./ListPanel.jsx";
import TodoForm from "./TodoForm.jsx";
import Todos from "./Todos.jsx";
const url ="http://localhost:3000/todos?completed=0";

export default class TodoList extends Component  {

    componentWillMount () {

        this.props.getTodos( url, "uncompleted" );

    }

    render () {

        return (
          <div className ="todo-list">
          <ListPanel removeAuthorization= {this.props.removeAuthorization}
            showSettings= {this.props.showSettings}/>
          <TodoForm textarea = {this.props.textarea} option = {this.props.option}
            addTodo = {this.props.addTodo} onChange = {this.props.onChange}/>
            <ul className = "list-display">
              { (this.props.todos.map) ?
                this.props.todos.map( todo => {

                    return (
                      <Todos key = {todo.id} todo = {todo} textarea = {this.props.textarea}
                        onChange = {this.props.onChange} addTodo = {this.props.addTodo}
                      deleteTodo = {this.props.deleteTodo} editTodo = {this.props.editTodo}
                      completeTodo = {this.props.completeTodo}/>
                    );

                } )
               : <div className="server-down">
                    <strong>{this.props.todos}</strong>
                    <i className="fa fa-server" aria-hidden="true"></i>
                    <i className="fa fa-frown-o" aria-hidden="true"></i>
                 </div>
              }
            </ul>
            { this.props.children }
          </div>
        );

    }
}
