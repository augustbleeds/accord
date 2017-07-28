import { Alert } from 'react-native';
import * as firebase from 'firebase';

// action creators
function loadUserInfo(dispatch, email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password)
  .then((user) => {
    console.log('user is', user);
    if(user && user.emailVerified){
      return fetch('https://us-central1-accord-18bdf.cloudfunctions.net/route/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
    }else{
      Alert.alert('Please verify your email first');
      return null;
    }
  })
  .then((response) => {
    if(!response){
      return null;
    }
    return response.json();
  })
  .then((userJson) => {
    // if the response is an object (if response is null, no action will be dispatched)
    if(userJson){
      dispatch({ type: 'LOAD_USER', payload: userJson});
    }
  })
}

function loadStoredUserInfo(dispatch, userJson) {
  dispatch({ type: 'LOAD_USER', payload: userJson});
}


function loadCurrentFriendInfo(dispatch, currentFriendJson){
  dispatch({ type: 'LOAD_FRIEND', payload: currentFriendJson });
}

export { loadUserInfo, loadCurrentFriendInfo, loadStoredUserInfo };
