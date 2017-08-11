const functions = require('firebase-functions');
const app = require('express')();
const admin = require('firebase-admin');
var serviceAccount = require("./config.json");
const axios = require('axios')
const quokkaURL = 'http://www.traveller.com.au/content/dam/images/g/u/n/q/h/0/image.related.articleLeadwide.620x349.gunpvd.png/1488330286332.png';
admin.initializeApp(functions.config().firebase);
const dbRootRef = admin.database().ref();
const Expo = require('exponent-server-sdk');
const Analytics = require('analytics-node');
const analytics = new Analytics('21WZeFangJR07cj0S6subFRQ1LISyOHk', { flushAt: 1 });

/**
 * Responds to a login request.
 * 1. Parses the email (TODO: fix later to parse from '.edu' and not the first '.')
 * 2. Sends back the value (null or truthy)
 * 3. (front-end @ LoginScree.js conditions on the response, and handles appropriate route)
 */
app.post('/login', (req, res) => {
  var email = req.body.email.split('.')[0];
  // console.log(`Email user wants to login is ${JSON.stringify(email)}`);
  dbRootRef.child(`/User/${email}`).once('value')
    .then((userSnap) => {
      // console.log(`User Snap for ${req.body.email} is ${JSON.stringify(userSnap.val())}`);
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
    // password: req.body.password,
    gender: req.body.gender,
    email: req.body.email,
    school: req.body.school,
    searching: null,
    desc: req.body.desc,
    friends: null,
    img: quokkaURL
  };
  var email = req.body.email.split('.')[0];
  // set up analytics
  analytics.identify({
    userId: email,
    traits: {
      nickname: req.body.nickname,
      email: req.body.email,
      school: req.body.school,
      createdAt: new Date(),
    }
  });
  dbRootRef.child(`/User/${email}`).set(newObj)
    .then(() => {res.json(newObj)})
    .catch((err) => res.json(null))
});

// TODO: after authentication, we haven't used this yet
app.get('/logout', (req, res) => {
  console.log('we did logout correctly');
  res.send('Hello3');
});

/**
 * Retrieving all friends belonging to a user
 * sends back an array of objects / or empty array
 */
app.get('/user/friends/:id', (req, res) => {
  // console.log('GETTING FRIENDS');
  var currId = req.params.id;
  dbRootRef.child(`/User/${currId}/friends`).once('value')
  .then((friendEmailsSnap) => {
    // TODO: object of emails....figure out if email_ids have the .edu in them.
    var emailsObj = friendEmailsSnap.val();
    // console.log('emailsObj is', JSON.stringify(emailsObj));
    // send back empty array
    if(!emailsObj){
      // console.log('inside of the if condition');
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
  // console.log('getting 2 friends')
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
  // console.log(`The condition is : ${tempRef}`);
  dbRootRef.child(`/Topic/${category}/${myId}`).set(true)
    .then((snapshot) => {
      // console.log(`User ${myId} was put in category ${category}`);
      res.send({success: true});
    })
    .catch((err) => {
      console.log(`Error putting user ${myId} in category ${category}`);
      res.json(null);
    });
});

let expo = new Expo();

 function sendMatchPush(pushToken) {
     expo.sendPushNotificationsAsync([{
       // The push token for the app user to whom you want to send the notification
       to: pushToken,
       sound: 'default',
       body: 'Accord: You have been matched with someone awesome. Click to chat!',
     }])
     .then(() => {
       console.log('success for pushing notifications');
     })
     .catch((err) => {
       console.log('error for pushing notifications', err);
     })
 }

 function sendMsgPush(pushToken, nickname) {
   expo.sendPushNotificationsAsync([{
     to: pushToken,
     sound: 'default',
     body: `Accord: New message from your friend ${nickname}`,
   }])
   .then(() => {
     console.log('success push msg');
   })
   .catch((err) => {
     console.log('error push msg', err);
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

        // track how many users match per day
        analytics.track({
          userId: firstKey,
          event: 'Matched',
          properties: {
            matchedUser: secondKey,
            topic: myTopic,
            createdAt: new Date(),
          }
        });

        analytics.track({
          userId: secondKey,
          event: 'Matched',
          properties: {
            matchedUser: firstKey,
            topic: myTopic,
            createdAt: new Date(),
          }
        });

        // two users in the match database! (as match1@aa : match2@bb)
        // first save
        dbRootRef.child(`/Match/${firstKey}`).set(secondKey)
          .then(() => {
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
             if(pushToken1){
               sendMatchPush(pushToken1.val());
             }
             return dbRootRef.child(`/User/${secondKey}/pushToken`).once('value');
           })
           .then((pushToken2) => {
             if(pushToken2){
               sendMatchPush(pushToken2.val())
             }
           })
          .then(() => console.log(`Two users with id ${firstKey} and ${secondKey} were matched! :) `))
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

    // track the use!
    analytics.track({
      userId: myId,
      event: 'Friend',
      properties: {
        friend: friendId,
        createdAt: new Date(),
      }
    });

    analytics.track({
      userId: friendId,
      event: 'Friend',
      properties: {
        friend: myId,
        createdAt: new Date(),
      }
    });

    return dbRootRef.update(updates);
  }


  /**
   * 2 databse triggers monitoring the status of the anonymous relationship.
   * @type {DATABASE TRIGGER}
   */
   exports.makeFriends1 = functions.database
   .ref('/FriendPending/{pairUsers}')
   .onCreate(event => {
     const pairsofUsers = event.params.pairUsers;
     dbRootRef.child(`/FriendPending/${pairsofUsers}`).once('value')
     .then(function(pairsSnap) {
      //  console.log('hit my line 232');
       var pairs = pairsSnap.val();
      //  console.log('pairs is', pairs);
       var objKeys = Object.keys(pairs);
       var first = objKeys[0];
       var second = objKeys[1];
       // if there was a leave then connect sequence
       if(!second){
         helperDeletePending(pairsofUsers);
         return;
       }
      //  console.log(`PENDING FRIEND DB TRIGGER firstUser: ${first}, secondUser: ${second}`);
       if (pairs[first] === 'LEAVE' || pairs[second] === 'LEAVE') {
         return helperDeletePending(pairsofUsers);
       }else if (pairs[first] === 'CONNECT' && pairs[second] === 'CONNECT') {
         helperAddFriends(first, second)
          .then((snapshot) => {
            // console.log(`added friends! ${first} and ${second}`);
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
      //  console.log('hit my line 232');
       var pairs = pairsSnap.val();
      //  console.log('pairs is', pairs);
       var objKeys = Object.keys(pairs);
       var first = objKeys[0];
       var second = objKeys[1];
       // if there was a leave then connect sequence
       if(!second){
         helperDeletePending(pairsofUsers);
         return;
       }
      //  console.log(`PENDING FRIEND DB TRIGGER firstUser: ${first}, secondUser: ${second}`);
       if (pairs[first] === 'LEAVE' || pairs[second] === 'LEAVE') {
         return helperDeletePending(pairsofUsers);
       }else if (pairs[first] === 'CONNECT' && pairs[second] === 'CONNECT') {
         helperAddFriends(first, second)
          .then((snapshot) => {
            // console.log(`added friends! ${first} and ${second}`);
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

   /**
    * [notifyFriendsMessage notifies friends of new chat messages]
    * @type {DATABASE TRIGGER}
    */
   exports.notifyFriendsMessage = functions.database
    .ref(`/Message/{chatId}/{messageId}`)
    .onCreate((event) => {
      console.log('IN THE TRIGGA');
      // get message
      const { chatId, messageId } = event.params;
      const msg = event.data.val();

      dbRootRef.child(`/User/${msg.to}/friends/${msg.from}`).once('value')
        .then(friendExists => {

          console.log('friendExists is', friendExists.val());
          // something like their img url for now
          if(friendExists.val()){
            // send push notifications to the receving friend
            return true;
          }
          return false;
        })
        .then(needToSend => {
          if(needToSend){
            console.log('getting the user info')
            return dbRootRef.child(`/User/${msg.to}`).once('value');
          }
          return false;
        })
        .then(userSnap => {
          if(userSnap){
            const { pushToken } = userSnap.val();
            dbRootRef.child(`/User/${msg.from}/nickname`).once('value')
            .then(nameSnap => {
              console.log(`about to send the msg notification to ${pushToken} ${nameSnap.val()}`);
              sendMsgPush(pushToken, nameSnap.val());
            })
            .catch((err) => {
              console.log('weird... there was an error', err);
            })

          }
        })
        .catch((err) => {
          console.log('Error notifying friends', err);
        })
    });



exports.route = functions.https.onRequest(app);
