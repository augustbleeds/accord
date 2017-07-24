import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {DrawerNavigator } from 'react-navigation';
import slideStyles from './components/slides'
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import AllScreen from './screens/AllScreen';
import GiftedChatScreen from './screens/GiftedChatScreen';
import FriendsScreen from './screens/FriendsScreen';
import HomeScreen from './screens/HomeScreen';
import FriendsChatScreen from './screens/FriendsChatScreen';

// import createStore from redux, the reducer, and Provider for connection react-redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import mainReducer from './reducers/mainReducer';

const screen={
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}


export default class App extends React.Component {

  render() {
    const MainNavigator = DrawerNavigator({
      Welcome: { screen: WelcomeScreen },
      Auth: { screen: AuthScreen },
      Login: { screen: LoginScreen },
      AllScreen: {screen: AllScreen},
      ChatScreen: {screen: GiftedChatScreen},
      FriendsChatScreen: {screen: FriendsChatScreen}
    }, {
  tabBarOptions: {
    showLabel: false,
    inactiveBackgroundColor: '#000000',
    activeBackgroundColor: '#000000',
    showLabel: false
  },
  navigationOptions: {
  drawerLockMode: 'locked-closed'
  }

    });

    return (
      <View style={styles.container}>
        <MainNavigator />
      </View>
    );
  }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    scrollwrap:{
        backgroundColor:'#f3f3f3',
    },
    wrapper:{
    },
    slider:{
        backgroundColor:'#97cae5',
        width:screen.width,
        height:screen.width/2,
    },
})
