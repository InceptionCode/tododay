import React from "react";
import axios from "axios";

function checkAuth (nextState, replaceState) {
    if (!localStorage.token) {

	replaceState({ nextPathname: nextState.location.pathname }, '/')
        return;
    }

}

function checkToken () {

    if ( localStorage.token ) {
	    
       axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
       this.setState( {
           token: localStorage.token,
           isAuthenticated: true
       } );
       this.context.router.push('/todo-list');
    } else {
 
 	 delete axios.defaults.headers.common['Authorization'];

    }
}

function setAuthAndToken ( token ) {

    const isAuthenticated =this.state.isAuthenticated;
    localStorage.setItem( "token", token );
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    this.setState( {
        isAuthenticated: !isAuthenticated,
        token: token
    } );
    this.context.router.push("/todo-list");

}


function removeAuthorization () {

    localStorage.clear();
    delete axios.defaults.headers.common['Authorization'];
    this.setState( {
        token: "",
        isAuthenticated: false
    } );
    this.context.router.push("/");

}


export { checkAuth, checkToken, setAuthAndToken, removeAuthorization };
