const fs = require('fs');
const express = require('express');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');
const server = jsonServer.create()
const router = jsonServer.router('./database.json')
const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'))
server.use(express.urlencoded({extended: true}))
server.use(express.json())
server.use(jsonServer.defaults());
const SECRET_KEY = '123456789'
const expiresIn = '1h'

// Create a token from a payload 
function createToken(payload){
  return jwt.sign(payload, SECRET_KEY, {expiresIn});
}

// Check if the user exists in database
function isAuthenticated({email, password}) {
  return userdb.users.findIndex(user => user.email === email && user.password === password) !== -1
}

// Login to one of the users from ./users.json
server.post('/login', (req, res) => {
  console.log("----------------------")
  console.log("----------------------")
  console.log("login endpoint called; request body:");
  console.log(req.body);
  console.log("----------------------")
  console.log("----------------------")
  const {email, password} = req.body;
  if (isAuthenticated({email, password}) === false) {
    const status = 401;
    const message = 'Incorrect email or password'
    res.status(status).json({status, message})
    return
  }
  const access_token = createToken({email})
  const letUserIn = true;
  console.log("Access Token:" + access_token);
  res.status(200).json({access_token, letUserIn});
})

// GET all users
server.get('/users', (req, res) => {
  console.log("----------------------");
  console.log("----------------------");
  console.log("Get All Users endpoint called");
  console.log("----------------------");
  console.log("----------------------");
  fs.readFile("./database.json", (err, data) => {
    if (err) {
      const status = 401
      const message = err
      res.status(status).json({status, message})
      return;
    };
    // Get current users data
    var data = JSON.parse(data.toString());
    res.status(200).json({data, data})
  });
});

// Add new User
server.post('/users', (req, res) => {
  console.log("----------------------");
  console.log("----------------------");
  console.log("Create User endpoint called");
  console.log(req.body);
  console.log("----------------------");
  console.log("----------------------");
  const {email, first_name, age, job} = req.body;
  fs.readFile("./database.json", (err, data) => {
    if (err) {
      const status = 401
      const message = err
      res.status(status).json({status, message})
      return;
    };

    // Get current users data
    var data = JSON.parse(data.toString());

    // Get the id of last user
    var last_item_id = data.users[data.users.length-1].id;

    //Add new user
    data.users.push({id: last_item_id + 1, email: email, first_name: first_name, age: age, job: job}); //add some data
    var writeData = fs.writeFile("./database.json", JSON.stringify(data), (err, result) => {  // WRITE
        if (err) {
          const status = 401
          const message = err
          res.status(status).json({status, message})
          return
        } 
        console.log('User Successfully Created');
        const status = 200;
        const message = 'User successfully created';
        res.status(status).json({status, message});
    });
  });
});

server.use(router)

// ------------------------
// Docker port
const port = process.env.PORT || 3002
// ------------------------
// NON Docker port
//const port = 4000;

server.listen(port, () => {
  console.log('Run Auth API Server')
})