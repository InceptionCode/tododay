"use strict";

import React from "react";

export default function TodoForm ( props ) {

    return (
        <div className ="todo-form">
          <form onSubmit = {props.addTodo}>
            <input onChange = {props.onChange} type="text"
            placeholder = "Start your day off right with a proactive list. . ."
            value = {props.textarea.description}/>
          <button id = {( props.textarea.description ) ? "show" : "hide"}
            className = "add --style" type = "submit"> Add </button>
          </form>
        </div>
    );

}
