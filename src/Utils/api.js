import axios from "axios";
import jwt from "jsonwebtoken";
import { tryRequest } from "./utils.js";
const signupURL ="http://67.205.174.156:3000/signup";
const requestUrl = "http://67.205.174.156:3000/";

function getTodos ( url, todosType ) {

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

function postRequest ( request ) {

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

function editTodo ( item ) {

    this.setState( {
         textarea: { description: item.description },
         editTodoId: item.id
    } );

}


function insertTodo () {

    let user =jwt.decode( this.state.token ),
        description =this.state.textarea.description,
        data ={ user_id: user.id, description };
    const request ={
            url: requestUrl + "todos" ,
            method: "POST",
            data: data
        };
    this.postRequest( request );
}

function updateTodo () {

    let textarea =this.state.textarea,
        todos =this.state.todos,
        id =this.state.editTodoId,
        newTodos =todos.map( todo => {

        	( todo.id ===id ) ? todo.description =textarea.description : null;
                return todo;

        } );

    const request ={
            url: requestUrl + "todos/" + id,
            method: "PUT",
            data: textarea
        };
        tryRequest( request );
        this.setState( {
            todos: newTodos,
            textarea: { description: "" },
            editTodoId: null
        } );

}

function addTodo ( e ) {

        e.preventDefault();
        let editTodoId =this.state.editTodoId,
            textarea =this.state.textarea.description;

        if ( editTodoId &&textarea !=="" ) {

            return this.updateTodo();

        }else if ( textarea !=="" ) {

            return this.insertTodo();

        }

}

function deleteTodo ( id ) {

        let todos =this.state.todos,
            newTodos =todos.filter( todo => todo.id !==id );

        const request ={
            url: requestUrl + "todos/" + id,
            method: "DELETE"
        };
        tryRequest( request );
        this.setState( { todos: newTodos } );

}

function completeTodo( e, id ) {

        let url = requestUrl + "todos/" + id,
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

            tryRequest( request );

        }
}


function uncompleteTodo( id ) {

        const todos =this.state.todos,
            completed ={ completed: 0 },
            request ={
                url: requestUrl + "todos/" + id,
                method: "PUT",
                data: completed
            };

        tryRequest( request );
        let newTodos =todos.filter( todo => todo.id !==id );
        this.setState( {
            todos: newTodos
        } );

}

function prepareSignupRequest ( e ) {

        let email =this.state.email,
            password =this.state.password,
            confirmPassword =this.state.confirm_password;

        e.preventDefault();
        const data ={
                email: email,
                password: confirmPassword
            },
            request ={
                url: signupURL,
                method: "POST",
                data: data
            };
	if (password === confirmPassword) {
		this.makeSignupRequest(request);
	}else {
                                                                                       
           this.setState( {
               password_error: "Opps seems like the passwords don\'t match. Try again."
	   } );
	}

}

function makeSignupRequest( request ) {

	axios( request )
	   .then( result => {

		 let token = result.data.token;
                 this.props.setAuthAndToken( token );	 

           },err => {

                 let errorMessage =err.response.data;
                 this.setState( {
                     password_error: errorMessage
                 } );

           } );

} 

function loginErrorHandler ( err ) {

	let responseMessage;
              if( err.message === "Network Error" ) {

                  responseMessage ="Sorry the server is down, try again later.";

              }else if( err.response.status === 404 || err.response.status === 401) {
		  
                  responseMessage = err.response.data;
	
	      }else {
		  
 		  responseMessage = "Look I know this may be frustrating but try again soon. It should work.";        
	
             }
	this.setState( { responseMessage } );
}	
	

function loginUser ( e ) {

        e.preventDefault();
        const data ={
                email: this.state.email,
                password: this.state.password
            },
            request ={
                url: requestUrl +"auth",
                method: "POST",
                data: data
            };

        axios( request )
          .then( result => {

              let token =result.data.token;
              this.props.setAuthAndToken( token );
             
          }, err => {

		this.loginErrorHandler(err);

          } );

}

export { 
	postRequest, 
	getTodos, 
	insertTodo, 
	updateTodo, 
	addTodo, 
	editTodo, 
	deleteTodo, 
	completeTodo,
	uncompleteTodo,
	prepareSignupRequest,
	makeSignupRequest,
	loginUser,
	loginErrorHandler
 };
