import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
// import MapScreen from './screens/MapScreen';
// import DeckScreen from './screens/DeckScreen';
// import ReviewScreen from './screens/ReviewScreen';
// import SettingsScreen from './screens/SettingsScreen';

const screen={
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}


export default class App extends React.Component {

  render() {
    const MainNavigator = TabNavigator({
      Welcome: { screen: WelcomeScreen },
      Auth: { screen: AuthScreen },
    }, {
  tabBarOptions: {
    showLabel: false,
    inactiveBackgroundColor: '#000000',
    activeBackgroundColor: '#000000'
  },
      // main: {
      //   screen: TabNavigator({
      //     map: { screen: MapScreen},
      //     deck: { screen: DeckScreen},
      //     review: {
      //       screen: StackNavigator({
      //         review: { screen: ReviewScreen},
      //         settings: { screen: SettingsScreen}
      //       })
      //     }
      //   })
      // }
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
