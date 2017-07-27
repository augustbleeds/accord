import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import firebase from 'firebase';


export default async (userId) => {
  let previousToken = await AsyncStorage.getItem('pushtoken');

  const { existingStatus } = await Permissions.getAsync(Permissions.REMOTE_NOTIFICATIONS);
  let finalStatus = existingStatus;
  console.log('debbo existing status is', finalStatus);

  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
    finalStatus = status;
    console.log('debbo final status', status);
  }

  if(finalStatus !== 'granted'){
    return;
  }

  let token = await Notifications.getExponentPushTokenAsync();
  // PUT the token in our DB so we have it for good.
  await firebase.database().ref(`/User/${userId}/pushToken`).set(token);
  await AsyncStorage.setItem('pushtoken', token);
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
}
