const axios = require("axios");

const url = "https://expressjs-knowthen.c9users.io/todos";

const config = {
    url: url
};

const newTodo = {
    description: "Make Dinner"
}

const updateTodo = {
    description: "Drive The Car",
    username: 'james'
};

// const request = {
//     url: url,
//     method: "POST",
//     data: newTodo
// }

// axios(request)

//const promise = axios.post(url, newTodo, config);

function success(response){
    console.log(response.status, response.data);
}

function fail(err){
    console.log(err);
}

// const deleteUrl = "https://expressjs-knowthen.c9users.io/todos/2";
// axios.delete(deleteUrl)
//     .then(success, fail);


const updateUrl = "http://localhost:3000/todos/3";
axios.put(updateUrl, updateTodo)
    .then(success, fail);
