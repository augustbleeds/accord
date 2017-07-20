const functions = require('firebase-functions');
const app = require('express')();
const admin = require('firebase-admin');
var serviceAccount = require("./config.json");
//const messaging = firebase.messaging();

const quokkaURL = 'http://www.traveller.com.au/content/dam/images/g/u/n/q/h/0/image.related.articleLeadwide.620x349.gunpvd.png/1488330286332.png';

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://accord-18bdf.firebaseio.com"
// });

admin.initializeApp(functions.config().firebase);

const dbRootRef = admin.database().ref();
//const database = fire.database();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


//User logging in
app.post('/login', (req, res) => {
  // admin.auth().signInWithEmailAndPassword(req.body.email, req.body.password).catch((error) => {
  //   res.json({error: error});
  // });
  //var pass = req.body.password
  var email = req.body.email.split('.')[0];
  console.log(`Email user wants to login is ${JSON.stringify(email)}`);
  dbRootRef.child(`/User/${email}`).once('value')
    .then((userSnap) => {
      console.log(`User Snap for ${req.body.email} is ${JSON.stringify(userSnap.val())}`);
      res.json(userSnap.val())
    })
    .catch((err) => {res.json({error: err})})
  // dbRootRef.child('/User/test@test').once('value')
  //   .then((userSnap) => {res.json(userSnap.val())})
  //   .catch((err) => {res.json({error: err})})
});

//User registering information
app.post('/register', (req, res) => {
  // create a new User reference
  const newObj = {
    nickname: req.body.nickname,
    password: req.body.password,
    gender: req.body.gender,
    email: req.body.email,
    school: req.body.school,
    searching: null,
    desc: req.body.desc,
    friends: null,
    img: quokkaURL
  };
  dbRootRef.child(`/User/${req.body.email.split('.')[0]}`).set(newObj)
    .then(() => {res.json(newObj)})
    .catch((err) => res.send('ERROR'))
  //const newUserRef = dbRootRef.child('User').push();
  // create object for reference
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

  // newUserRef.set(newObj)
  // .then(() => {res.json(newObj)})
  // .catch((err) => res.send('ERROR'))
});

app.get('/logout', (req, res) => {
  console.log('we did logout correctly');
  res.send('Hello3');
});

//Finding an array of objects friends of the current user
app.get('/user/friends/:id', (req, res) => {
  console.log('GETTING FRIENDS');
  var currId = req.params.id;
  dbRootRef.child(`/User/${currId}/friends`).once('value')
    .then((friendEmailsSnap) => {
      var email_id = friendEmailsSnap.val();
      if(!email_id){
        res.json([]);
        return;
      }
      var emails = Object.keys(email_id);
      // var objToReturn = {};

      var FriendsPromise = emails.map(email => (dbRootRef.child(`/User/${email}`).once('value')));
      Promise.all(FriendsPromise)
        .then(friendsSnap => {
          var friendsObj = friendsSnap.map(friendSnap => (friendSnap.val()));
          res.json(friendsObj);
        })

      // for (var i = 0; i < emails.length; i++) {
      //   dbRootRef.child(`/User/${emails[i]}`).once('value')
      //     .then((userSnap) => {
      //       var userObj = userSnap.val();
      //       objToReturn[emails[i]] = {
      //         img: userObj.img,
      //         nickname: userObj.nickname
      //       };
      //       // res.json(objToReturn);
      //     })
      // }
      // // i got the friend's id (this is an object)
      // //res.json(friendsSnap.val())
      // res.json(objToReturn);
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
  // var category = 'Family';
  // var myId = '-Kp26_r2wh1z3JUytJyb';
  var category = req.params.category;
  var myId = req.params.id;
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


exports.matchUsers = functions.database
  // listen for new users in ANY topic
  .ref('/Topic/{changedTopic}/{newUser}')
  .onCreate((event) => {
    // get all of the children of the topic in question
    const myTopic = event.params.changedTopic;
    dbRootRef.child(`/Topic/${myTopic}`).once('value')
      .then((topicSnap) => {
        // get all the users {'asdfsadf': true, 'adfasdf', true}
        const usersObj = topicSnap.val();
        const keysArr = Object.keys(usersObj);
        // return if no matches found!
        if (keysArr.length < 2) {
          return;
        }
        // theses are user ids
        var firstKey = keysArr[0];
        var secondKey = keysArr[1];
        // put two users in the match database!
        dbRootRef.child(`/Match/${firstKey}`).set(secondKey)
          .then(() => {
            console.log('got to the last part!');
            // second save
            return dbRootRef.child(`/Match/${secondKey}`).set(firstKey);
          })
          .then(() => {
            // delete
            var updates = {};
            updates[`/Topic/${myTopic}/${firstKey}`] = null;
            updates[`/Topic/${myTopic}/${secondKey}`] = null;
            return dbRootRef.update(updates);
          })
          .then(() => console.log(`Two users with id ${firstKey} and ${secondKey} were matched! :) `))
          .catch((err) => console.log(err))
      })
  });
  // .ref('/Topic/{changedTopic}/debbie')
  // .onCreate((event) => {
  //   console.log('we made it');
  //   console.log(event.data.val());
  // });

exports.route = functions.https.onRequest(app);
