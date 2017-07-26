import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import firebase from 'firebase';


export default async (userId) => {
  let previousToken = await AsyncStorage.getItem('pushtoken');

  if(previousToken) {
    return;
  } else {
    console.log('enabling notifications..');
    const { existingStatus } = await Permissions.getAsync(Permissions.REMOTE_NOTIFICATIONS);
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
      finalStatus = status;
      console.log('final status', status);
    }

    if(finalStatus !== 'granted'){
      return;
    }

    let token = await Notifications.getExponentPushTokenAsync();
    // PUT the token in our DB so we have it for good.
    await firebase.database().ref(`/User/${userId}/pushToken`).set(token);
    await AsyncStorage.setItem('pushtoken', token);
  }
}
