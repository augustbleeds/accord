import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import {StackNavigator} from 'react-navigation';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import AllScreen from './screens/AllScreen';
import GiftedChatScreen from './screens/GiftedChatScreen';
import FriendsScreen from './screens/FriendsScreen';
import HomeScreen from './screens/HomeScreen';
import FriendsChatScreen from './screens/FriendsChatScreen';
import SettingsScreen from './screens/SettingsScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import mainReducer from './reducers/mainReducer';

// import firebase from 'firebase';
// var config = {
//    apiKey: "AIzaSyDkhtl4JKhb_1aHL3ookaq0iSRsXmW1Hcg",
//    authDomain: "accord-18bdf.firebaseapp.com",
//    databaseURL: "https://accord-18bdf.firebaseio.com",
//    projectId: "accord-18bdf",
//    storageBucket: "accord-18bdf.appspot.com",
//    messagingSenderId: "986125110855"
//  };
// firebase.initializeApp(config);

const store = createStore(mainReducer);

const screen={
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}


export default class App extends React.Component {

  render() {
    const MainNavigator = StackNavigator({
      Welcome: { screen: WelcomeScreen },
      Auth: { screen: AuthScreen },
      Login: { screen: LoginScreen },
      ForgotPassword: { screen: ForgotPasswordScreen },
      AllScreen: {screen: AllScreen},
      ChatScreen: {screen: GiftedChatScreen},
      FriendsChatScreen: {screen: FriendsChatScreen},
      SettingsScreen: {screen: SettingsScreen},
    }, {
    headerMode: 'none',
    navigationOptions: ({navigation}) => ({
      gesturesEnabled: false,
    })
  });

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
});
