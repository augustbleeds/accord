const functions = require('firebase-functions');
const app = require('express')();
const admin = require('firebase-admin');
var serviceAccount = require("./config.json");
const axios = require('axios')
const quokkaURL = 'http://www.traveller.com.au/content/dam/images/g/u/n/q/h/0/image.related.articleLeadwide.620x349.gunpvd.png/1488330286332.png';
admin.initializeApp(functions.config().firebase);
const dbRootRef = admin.database().ref();
const Expo = require('exponent-server-sdk');



/**
 * Responds to a login request.
 * 1. Parses the email (TODO: fix later to parse from '.edu' and not the first '.')
 * 2. Sends back the value (null or truthy)
 * 3. (front-end @ LoginScree.js conditions on the response, and handles appropriate route)
 */
app.post('/login', (req, res) => {
  // TODO delete
  // admin.auth().signInWithEmailAndPassword(req.body.email, req.body.password).catch((error) => {
  //   res.json({error: error});
  // });
  //var pass = req.body.password
  // TODO delete

  var email = req.body.email.split('.')[0];
  console.log(`Email user wants to login is ${JSON.stringify(email)}`);
  dbRootRef.child(`/User/${email}`).once('value')
    .then((userSnap) => {
      console.log(`User Snap for ${req.body.email} is ${JSON.stringify(userSnap.val())}`);
      res.json(userSnap.val())
    })
    .catch((err) => {res.json({error: err})})
});

/**
 * Responds to a Registration Request
 * 1. Construct new User Object to save
 * 2. Save in firebase
 */
app.post('/register', (req, res) => {
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
  var email = req.body.email.split('.')[0];
  dbRootRef.child(`/User/${email}`).set(newObj)
    .then(() => {res.json(newObj)})
    .catch((err) => res.json(null))
});

// TODO: after authentication
app.get('/logout', (req, res) => {
  console.log('we did logout correctly');
  res.send('Hello3');
});

/**
 * Retrieving all friends belonging to a user
 * sends back an array of objects / or empty array
 */
app.get('/user/friends/:id', (req, res) => {
  console.log('GETTING FRIENDS');
  var currId = req.params.id;
  dbRootRef.child(`/User/${currId}/friends`).once('value')
  .then((friendEmailsSnap) => {
    // TODO: object of emails....figure out if email_ids have the .edu in them.
    var emailsObj = friendEmailsSnap.val();
    console.log('emailsObj is', JSON.stringify(emailsObj));
    // send back empty array
    if(!emailsObj){
      console.log('inside of the if condition');
      res.json([]);
      return null;
    }
    var emailsArr = Object.keys(emailsObj);
    var FriendsPromise = emailsArr.map(email => (dbRootRef.child(`/User/${email}`).once('value')));
    // return promise for array of friend objects
    return Promise.all(FriendsPromise);
  })
  .then(friendsSnap => {
    if(!friendsSnap){
      return;
    }
    var friendsObj = friendsSnap.map(friendSnap => (friendSnap.val()));
    // send back array of objects
    res.json(friendsObj);
    return;
  })
  .catch((err) => {
    console.log("error getting friends", err);
    res.json(null);
    return;
  });
});

/**
 * Add two friends by their email Ids. It's a mutual relationship
 * @type {POST}
 */
//When 2 people add each other as friends
app.post('/user/add', (req, res) => {
  console.log('getting 2 friends')
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
});

/**
 * Finds profile of current user
 * @type {GET}
 */
app.get('/user/profile/:id', (req, res) => {
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

/**
 * Add user with :id to :category
 *  TODO: add a limit of one match at a time
 * @type {POST}
 */
app.post('/user/match/:category/:id', (req, res) => {
  var category = req.params.category;
  var myId = req.params.id;
  var tempRef = dbRootRef.child(`/Topic/${category}/${myId}`);
  console.log(`The condition is : ${tempRef}`);
  dbRootRef.child(`/Topic/${category}/${myId}`).set(true)
    .then((snapshot) => {
      console.log(`User ${myId} was put in category ${category}`);
      res.send({success: true});
    })
    .catch((err) => {
      console.log(`Error putting user ${myId} in category ${category}`);
      res.json(null);
    });
});

let expo = new Expo();

function sendPush(pushToken) {
  console.log('we are in sendPush function');
    expo.sendPushNotificationsAsync([{
      // The push token for the app user to whom you want to send the notification
      to: pushToken,
      sound: 'default',
      body: 'Accord: You have been matched with someone awesome. Open your app!',
    }])
    .then(() => {
      console.log('success for pushing notifications');
    })
    .catch((err) => {
      console.log('error for pushing notifications', err);
    })
}

/**
 * Match 2 users
 * @type {DATABASE TRIGGER}
 */
exports.matchUsers = functions.database
  // listen for new users in ANY topic
  .ref('/Topic/{changedTopic}/{newUser}')
  .onCreate((event) => {
    // get all of the children of the topic in question
    const myTopic = event.params.changedTopic;
    dbRootRef.child(`/Topic/${myTopic}`).once('value')
      .then((topicSnap) => {
        // get all the users {'match1@aa.edu': true, 'match2@bb.edu', true}
        const usersObj = topicSnap.val();
        const keysArr = Object.keys(usersObj);
        // return if no matches found!
        if (keysArr.length < 2) {
          return;
        }
        // theses are user ids
        var firstKey = keysArr[0];
        var secondKey = keysArr[1];
        // put two users in the match database! (as match1@aa : match2@bb)
        dbRootRef.child(`/Match/${firstKey}`).set(secondKey)
          .then(() => {
            console.log('got to the last part!');
            // second save
            return dbRootRef.child(`/Match/${secondKey}`).set(firstKey);
          })
          .then(() => {
            // delete users from the topic category because they've been matched.
            var updates = {};
            updates[`/Topic/${myTopic}/${firstKey}`] = null;
            updates[`/Topic/${myTopic}/${secondKey}`] = null;
            return dbRootRef.update(updates);
          })
          .then(() => {
            return dbRootRef.child(`/User/${firstKey}/pushToken`).once('value');
          })
          .then((pushToken1) => {
            console.log('in first then');
            if(pushToken1){
              sendPush(pushToken1.val());
            }
            return dbRootRef.child(`/User/${secondKey}/pushToken`).once('value');
          })
          .then((pushToken2) => {
            console.log('in second then');
            if(pushToken2){
              sendPush(pushToken2.val())
            }
          })
          .catch((err) => console.log(err))
      })
  });

  function helperDeletePending(pairsofUsers){
    var updates = {};
    updates[`/FriendPending/${pairsofUsers}`] = null;
    return dbRootRef.update(updates);
  }

  function helperAddFriends(myId, friendId) {
    var updates = {};
    updates[`/User/${myId}/friends/${friendId}`] = quokkaURL;
    updates[`/User/${friendId}/friends/${myId}`] = quokkaURL;

    return dbRootRef.update(updates);
  }


  /**
   * 2 users becoming friends
   * @type {DATABASE TRIGGER}
   */
   exports.makeFriends1 = functions.database
   .ref('/FriendPending/{pairUsers}')
   .onCreate(event => {
     const pairsofUsers = event.params.pairUsers;
     dbRootRef.child(`/FriendPending/${pairsofUsers}`).once('value')
     .then(function(pairsSnap) {
       console.log('hit my line 232');
       var pairs = pairsSnap.val();
       console.log('pairs is', pairs);
       var objKeys = Object.keys(pairs);
       var first = objKeys[0];
       var second = objKeys[1];
       // if there was a leave then connect sequence
       if(!second){
         helperDeletePending(pairsofUsers);
         return;
       }
       console.log(`PENDING FRIEND DB TRIGGER firstUser: ${first}, secondUser: ${second}`);
       if (pairs[first] === 'LEAVE' || pairs[second] === 'LEAVE') {
         return helperDeletePending(pairsofUsers);
       }else if (pairs[first] === 'CONNECT' && pairs[second] === 'CONNECT') {
         helperAddFriends(first, second)
          .then((snapshot) => {
            console.log(`added friends! ${first} and ${second}`);
            return helperDeletePending(pairsofUsers);
          })
          .catch((err) => {
            console.log('error adding friends', err);
          });
      } else {
        return;
      }
     })
     .catch(err => {
       console.log('error ', err);
     });
   });

   exports.makeFriends2 = functions.database
   .ref('/FriendPending/{pairUsers}')
   .onUpdate(event => {
     const pairsofUsers = event.params.pairUsers;
     dbRootRef.child(`/FriendPending/${pairsofUsers}`).once('value')
     .then(function(pairsSnap) {
       console.log('hit my line 232');
       var pairs = pairsSnap.val();
       console.log('pairs is', pairs);
       var objKeys = Object.keys(pairs);
       var first = objKeys[0];
       var second = objKeys[1];
       // if there was a leave then connect sequence
       if(!second){
         helperDeletePending(pairsofUsers);
         return;
       }
       console.log(`PENDING FRIEND DB TRIGGER firstUser: ${first}, secondUser: ${second}`);
       if (pairs[first] === 'LEAVE' || pairs[second] === 'LEAVE') {
         return helperDeletePending(pairsofUsers);
       }else if (pairs[first] === 'CONNECT' && pairs[second] === 'CONNECT') {
         helperAddFriends(first, second)
          .then((snapshot) => {
            console.log(`added friends! ${first} and ${second}`);
            return helperDeletePending(pairsofUsers);
          })
          .catch((err) => {
            console.log('error adding friends', err);
          });
      } else {
        return;
      }
     })
     .catch(err => {
       console.log('error ', err);
     });
   });



exports.route = functions.https.onRequest(app);
