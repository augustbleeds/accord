const functions = require('firebase-functions');
const app = require('express')();
const admin = require('firebase-admin');
var serviceAccount = require("./config.json");

const quokkaURL = 'http://www.traveller.com.au/content/dam/images/g/u/n/q/h/0/image.related.articleLeadwide.620x349.gunpvd.png/1488330286332.png';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://accord-18bdf.firebaseio.com"
});

const dbRootRef = admin.database().ref();

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
  // create a new User reference
  const newUserRef = dbRootRef.child('User').push();
  // create object for reference
  const newObj = {
    nickname: req.body.name,
    gender: req.body.gender,
    email: req.body.email,
    school: req.body.school,
    searching: null,
    desc: req.body.description,
    friends: null,
    img: quokkaURL,
    _id: newUserRef.key,
  }
  console.log('HIT REGISTER')
  // const newObj = {
  //   nickname: 'aug',
  //   gender: 'M',
  //   email: 'aug@rutgers.edu',
  //   school: 'Rutgers University',
  //   searching: null,
  //   desc: 'I am sad.',
  //   friends: null,
  //   img: 'http://www.traveller.com.au/content/dam/images/g/u/n/q/h/0/image.related.articleLeadwide.620x349.gunpvd.png/1488330286332.png',
  //   _id: newUserRef.key,
  // }

  newUserRef.set(newObj)
  .then(() => {res.json(newObj)})
  .catch((err) => res.send('ERROR'))
});

app.get('/logout', (req, res) => {
  res.send('Hello3');
});

//Finding all friends of the current user
app.get('/user/friends/:id', (req, res) => {
  console.log('GETTING FRIENDS');
  var currId = req.params.id;
  //var currId = '-Kp25oaf2W35ZAjU7ebZ';
  dbRootRef.child(`/User/${currId}/friends`).once('value')
    .then((friendsSnap) => {
      // i got the friend's id (this is an object)
      res.json(friendsSnap.val())
    })
    // i need to get friend's imgs
});

//When 2 people add each other as friends
app.post('/user/add', (req, res) => {
  console.log('getting 2 friends')
  // var myId = '-Kp25oaf2W35ZAjU7ebZ';
  // var friendId = '-Kp26_r2wh1z3JUytJyb';
  var myId = req.body.myId;
  var friendId = req.body.friendId;
  var updates = {};
  updates[`/User/${myId}/friends/${friendId}`] = quokkaURL;
  updates[`/User/${friendId}/friends/${myId}`] = quokkaURL;

  dbRootRef.update(updates)
    .then((snapshot) => {
      res.json({success: true})
    })
    .catch((err) => {
      res.json({error: err})
    })
  // dbRootRef.child(`/User/${myId}/friends`).once('value')
  //   .then((friendsSnap) => {
  //     // i got the friend's id (this is an object)
  //     res.json(friendsSnap.val())
  //   })
});

//Finds profile of user
app.get('/user/profile/:id', (req, res) => {
  //var currId = '-Kp25oaf2W35ZAjU7ebZ';
  var currId = req.params.id;
  dbRootRef.child(`/User/${currId}`).once('value')
    .then((friendSnap) => {
      var friendObj = friendSnap.val();
      var jsonObj = {
        name: friendObj.nickname,
        img: friendObj.img,
        _id: friendObj._id,
        school: friendObj.school,
        desc: friendObj.desc,
        gender: friendObj.gender
      };
      res.json(jsonObj);
    });
});

//Adds user to database
app.post('/user/match/:category/:id', (req, res) => {
  var category = 'Family';
  var myId = '-Kp25oaf2W35ZAjU7ebZ';
  // var category = req.params.category;
  // var myId = req.params.id;
  if (!dbRootRef.child(`/Topic/${category}/${myId}`)) {
    res.json({success: true});
  }
  else {
    dbRootRef.child(`/Topic/${category}/${myId}`).set(true)
      .then((snapshot) => {
        res.send({success: true});
      })
  }
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
