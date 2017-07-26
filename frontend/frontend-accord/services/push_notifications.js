import { Permissions, Notifications } from 'expo';
import axios from 'axios';
const PUSH_ENDPOINT = 'https://us-central1-accord-18bdf.cloudfunctions.net/route';

export default async() => {
  let previousToken = await AsyncStorage.getItem('pushtoken');

  if(previousToken) {
    return;
  } else {
    const { existingStatus } = await Permissions.getAsync(Permissions.REMOTE_NOTIFICATIONS);
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      return;
    }
    let token = await Notifications.getExponentPushTokenAsync();
    // POST the token to our backend so we can use it to send pushes from there
    return fetch(PUSH_ENDPOINT, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: {
          value: token,
        },
        user: {
          username: 'Brent',
        },
      }),
    });
    AsyncStorage.setItem('pushtoken', token);
  }
}
}
