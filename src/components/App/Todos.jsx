"use strict";
import React from "react";

export default function TodoList ( props ) {

    const { editTodo, deleteTodo, completeTodo, todo } =props;
    return (
      <div>
        <li onClick = {( e )=> completeTodo( e, todo.id )} key = {todo.id}>
          <span />
          {todo.description}
          <i onClick = {()=>deleteTodo( todo.id )} className = "fa fa-trash"
            aria-hidden = "true" />
          <i onClick = {()=>editTodo( todo )} className = "fa fa-pencil"
            aria-hidden = "true" />
        </li>
      </div>
    );

}
