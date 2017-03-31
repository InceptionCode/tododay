import React, { Component } from "react";
import { Router, Route, IndexRoute, hashHistory, Redirect } from "react-router";
import axios from "axios";
import Container from "./Container/Container.jsx";
import TodoList from "./App/TodoList.jsx";
import AccountSettings from "./App/AccountSettings.jsx";
import SignIn from "./App/SignIn.jsx";
import CompletedList from "./App/CompletedList.jsx";
import SignUp from "./App/SignUp.jsx";
import { checkAuth } from "../Utils/auth.js";	

export default class TodoApp extends Component {
    render() {

        return (
          <div id ="todo-app">
            <Router history ={hashHistory}>
              <Route path ="/" component={Container}>
                <IndexRoute component={SignIn}  />
                <Route path="/sign-up" component={SignUp} />
                <Route path="/todo-list" component = {TodoList} onEnter = {checkAuth}/>
                <Route path="/account-settings" component={AccountSettings} onEnter = {checkAuth} />
                <Route path="/completed-list" component={CompletedList} onEnter = {checkAuth} />
              </Route>
            </Router>
          </div>
        );

    }
}
