const fs = require('fs');
const express = require('express');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');
const { ContactSupportOutlined } = require('@material-ui/icons');

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
  return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

// Verify the token 
function verifyToken(token){
  return  jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err)
}

// Check if the user exists in database
function isAuthenticated({email, password}) {
  return userdb.users.findIndex(user => user.email === email) !== -1
}

// Register New User - with Authentication
/* server.post('/auth/register', (req, res) => {
  console.log("----------------------")
  console.log("----------------------")
  console.log("register endpoint called; request body:");
  console.log(req.body);
  console.log("----------------------")
  console.log("----------------------")
  const {email, first_name, job, age} = req.body;

  if(isAuthenticated({email}) === true) {
    const status = 401;
    const message = 'An account with this Email already exists!';
    res.status(status).json({status, message});
    return
  }

  fs.readFile("./database.json", (err, data) => {  
    if (err) {
      const status = 401
      const message = err
      res.status(status).json({status, message})
      return
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
    });
  });

  // Create token for new user
  const access_token = createToken({email})
  const message = 'User Successfully Created';
  console.log("Access Token:" + access_token);
  res.status(200).json({access_token, message})
}) */

// Login to one of the users from ./users.json
server.post('/auth/login', (req, res) => {
  console.log("----------------------")
  console.log("----------------------")
  console.log("login endpoint called; request body:");
  console.log(req.body);
  console.log("----------------------")
  console.log("----------------------")
  const {email, password} = req.body;
  if (isAuthenticated({email, password}) === false) {
    const status = 401
    const message = 'Incorrect email or password'
    res.status(status).json({status, message})
    return
  }
  const access_token = createToken({email})
  const letUserIn = true;
  console.log("Access Token:" + access_token);
  res.status(200).json({access_token, letUserIn});
})

/* server.use(/^(?!\/auth).*$/,  (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401
    const message = 'Error in authorization format'
    res.status(status).json({status, message})
    console.log(req.headers);
    return
  }
  try {
    let verifyTokenResult;
     verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);

     if (verifyTokenResult instanceof Error) {
       const status = 401
       const message = 'Access token not provided'
       res.status(status).json({status, message})
       return
     }
     next()
  } catch (err) {
    const status = 401
    const message = 'Error access_token is revoked'
    res.status(status).json({status, message})
  }
}) */

// GET all users or DELETE user
// TO-DO: Add /auth/users to the URL - use Bearer Token
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
    });

  });
});

server.use(router)

server.listen(8000, () => {
  console.log('Run Auth API Server')
})