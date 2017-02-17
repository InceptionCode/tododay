import React from "react";
import ReactDOM from "react-dom";
import TodoApp from './components/TodoApp.jsx';


//styles
import main from "./css/todos.css";
import login from "./css/_sign-in/_sign-in.css";
import header from "./css/_navigation/_nav.css";
import list from "./css/_list/_list.css";
import form from "./css/_form/_form.css";
import accountSettings from "./css/_account-settings/_account-settings.css";
//Grab local token set it to the authorization header
// onEnter check if user has token. If so push user to the app.

ReactDOM.render(
<TodoApp />,
document.getElementById( 'app' )
);
