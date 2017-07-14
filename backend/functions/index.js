const functions = require('firebase-functions');
const app = require('express')();
const admin = require('firebase-admin');
var serviceAccount = require("./config.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://accord-18bdf.firebaseio.com"
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


//User logging in
app.post('/login', (req, res) => {
  res.send('Hello');
});

//User registering information
app.post('/register', (req, res) => {
  res.send('Hello2');
});

app.get('/logout', (req, res) => {
  res.send('Hello3');
});

//Finding all friends of the current user
app.get('/user/friends/:id', (req, res) => {
  res.send('Hello4');
});

//Finds profile of user
app.get('/user/profile/:id', (req, res) => {
  res.send('Hello5');
});

//Adds user to database
app.post('/user/match/:category/:id', (req, res) => {
  res.send('Hello6');
});


// exports.register = function.https.onRequest((request, response) => {
//   if (req.method === 'POST') {
//     req.body
//   }
// });
//
// exports.login = function.https.onRequest((req, res) => {
//
// });
//
// exports.logout = function.https.onRequest((req, res) => {
//
// });
//
// exports.user

exports.route = functions.https.onRequest(app);
