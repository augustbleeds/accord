import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import firebase from 'firebase';


export default async (userId) => {
  let previousToken = await AsyncStorage.getItem('pushtoken');

  const { existingStatus } = await Permissions.getAsync(Permissions.REMOTE_NOTIFICATIONS);
  let finalStatus = existingStatus;
  console.log('Existing status for notifications is', finalStatus);

  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
    finalStatus = status;
  }
  console.log('Final status is', status);

  if(finalStatus !== 'granted'){
    console.log('Permissions not granted');
    return;
  }

  console.log('Permission granted: generating a token now');
  let token = await Notifications.getExponentPushTokenAsync();
  
  // PUT the token in our DB so we have it for good.
  await firebase.database().ref(`/User/${userId}/pushToken`).set(token);
  await AsyncStorage.setItem('pushtoken', token);
}

// if(previousToken) {
//   // just for testing purposes
//   if()
//   return;
// } else {
//   const { existingStatus } = await Permissions.getAsync(Permissions.REMOTE_NOTIFICATIONS);
//   let finalStatus = existingStatus;
//   console.log('debbo existing status is', finalStatus);
//
//   if (existingStatus !== 'granted') {
//     const { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
//     finalStatus = status;
//     console.log('debbo final status', status);
//   }
//
//   if(finalStatus !== 'granted'){
//     return;
//   }
//
//   let token = await Notifications.getExponentPushTokenAsync();
//   // PUT the token in our DB so we have it for good.
//   await firebase.database().ref(`/User/${userId}/pushToken`).set(token);
//   await AsyncStorage.setItem('pushtoken', token);
// }
