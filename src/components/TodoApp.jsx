import React, { Component } from "react";
import { Router, Route, IndexRoute, hashHistory, browserHistory } from "react-router";
import axios from "axios";
import Container from "./Container/Container.jsx";
import TodoList from "./App/TodoList.jsx";
import AccountSettings from "./App/AccountSettings.jsx";
import SignIn from "./App/SignIn.jsx";
import CompletedList from "./App/CompletedList.jsx";
import SignUp from "./App/SignUp.jsx";


export default class TodoApp extends Component {
    render() {

        return (
          <div id ="todo-app">
            <Router history ={hashHistory}>
              <Route path ="/" component={Container}>
                <IndexRoute component={SignIn}  />
                <Route path="/sign-up" component={SignUp} />
                <Route path="/todo-list" component={TodoList} />
                <Route path="/account-settings" component={AccountSettings} />
                <Route path="/completed-list" component={CompletedList}/>
              </Route>
            </Router>
          </div>
        );

    }
}
