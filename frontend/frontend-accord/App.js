import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {StackNavigator} from 'react-navigation';
import slideStyles from './components/slides'
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import AllScreen from './screens/AllScreen';
import GiftedChatScreen from './screens/GiftedChatScreen';
import FriendsScreen from './screens/FriendsScreen';
import HomeScreen from './screens/HomeScreen';
import FriendsChatScreen from './screens/FriendsChatScreen';
import SettingsScreen from './screens/SettingsScreen';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import mainReducer from './reducers/mainReducer';

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
    },
});
