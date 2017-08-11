import { AsyncStorage, Alert } from 'react-native';
import firebase from 'firebase';
var config = {
   apiKey: "AIzaSyDkhtl4JKhb_1aHL3ookaq0iSRsXmW1Hcg",
   authDomain: "accord-18bdf.firebaseapp.com",
   databaseURL: "https://accord-18bdf.firebaseio.com",
   projectId: "accord-18bdf",
   storageBucket: "accord-18bdf.appspot.com",
   messagingSenderId: "986125110855"
 };
firebase.initializeApp(config);
var dbRootRef = firebase.database().ref();




export default function listenForMatch(myUserId, blurb, userObj, navigator, matchUsers) {
  // set Async for homescreen
  // console.log('listenForMatch was called!');

  // listen for when this user is matched!
  firebase.database().ref(`/Match/${myUserId}`).on('value', (data) => {
    if(!data.val()){
      return;
    }
    matchUsers(false);
    // update AsyncStorage
    AsyncStorage.mergeItem('user', JSON.stringify({searching: false}));
    Alert.alert(`You are matched. Happy connecting!`);

    navigator.navigate('ChatScreen', {
      username1: myUserId,
      username2: data.val(),
      userObj: userObj,
      blurb: blurb,
    });
    // remove it from the database
    dbRootRef.child(`/Match/${myUserId}`).remove();
    // detach listeners
    dbRootRef.child(`/Match/${myUserId}`).off();
  });
}
