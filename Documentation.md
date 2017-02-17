#User Data: What data does the user actually care about?
- list of todos: [{}]; //Check



#User View: What does the user care about seeing at all stages of the app?
- On initial open of the app, user would like to see current list of todos. //Check
- User would enjoy being able to see completed list todos on demand. //Check
- User would look for a textarea or input field and "Add" button in order to add a todo. //Check
- When user attempts to edit/update a note user would want to see a visual of how to do so. //Check
- When user attempts to delete a todo the user will need to see a visual of how to do so. //Check
- When attempting to mark a completed todo user would want to see how to mark the todo and if
the todo is actually completed. //Check




#User Behavior: What does the user actually want to do at all stages of the app.
- Create/Add todo //Check
- Edit/Update todo //Check
- Delete todo //Check
- Mark todo as completed //Check



#UI Components
---------------------------------------------------------------------------------------------------------
- TodoApp.jsx (Overall App)
- TodoList.jsx (List of All todos)
- CompletedList.jsx (List of only completed todos)
- ListPanel (Allows user to switch to differnt list)
- TodoForm.jsx (Contains the behavior options for the todos)



#UX Design & Behavior
---------------------------------------------------------------------------------------------------------
- When user clicks on textarea animate the textbox and highlight the add button //Check
- When user hovers over add button create a bounce animation with box shadow effect //Check
- When hovering over individual todo animate the todo fading out and having a line-through the todo
also show a trash can or delete button along with a pencil or edit button. //Check
- When user clicks on todo have a small div slide out left from the todo.
The div will be bright green with a solid check mark indicating completion.
Also have the todo line-through. //Check
- If user clicks on "edit" have the todo removed from the list and displayed in the textarea. //Check
- If user clicks on "delete" delay the re-render have the todo turn red and fade out then render the new list.


#Final Code Revision
-------------------------------------------------------------------------------------------------------------------
- Clean up CSS //Check
- Clean up JavaScript //Check


#Server Side
-------------------------------------------------------------------------------------------------------------------
- Add a users' table(s) //check
- ID, Email(unique index), hash(text) = table //check
- Library bcrypt for hashing bcrypt npm //check
- Library jason web token for sending back user tokens jwt.io//check
- Authenticate User //Some what completed.
- Adjust server.js with knex.js //check
- Handle the forgot password option
- Once user signs in display there todo list.
- Once user signs up create that user a new todo list.
- Allow user to see there account settings (email and password)


#Client Side
--------------------------------------------------------------------------------------------------------------------
- A way to sign-in or sign-up
- Add url param or query to get request url that will filter the todos //Check
- Have just one update function
- Add spinner or loader for get request
- Use a catch func instead of promise for axios that have (null) //Check


#Final Adjustments
--------------------------------------------------------------------------------------------------------------------------
##Database
-> How can we store different data (todos) for each user. ( Completed up for review )
-> Create a sql migration file for multiple tables database instances.
-> Host the database.

##Server
-> Once user signs in the server should return their list of todos from the database. ( Completed up for review )
-> Create a dot ENV file. ( DONE )
-> Host the server.js file.

##Front-End
-> Change the way todos are requested and added to the App state. ( Completed up for review )
-> Make the app responsive. (Completed)
-> Review the way the route system in the app works. ( Completed up for review )
-> Fix the way authorization is handled. ( Completed )
-> If user clicks the back error while logged in all logout actions should take place. ( Completed up for review )
##Extras
-> Implement a forgotten password and/or email functionality.
-> Allow user to see their account information and change their password, view their email etc...
-> Scale the todo system by allowing users to store separate, categorized lists of todos.
