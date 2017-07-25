import type { NavigationState } from 'react-native-tab-view/types';

import React, { PureComponent } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import FriendsScreen from './FriendsScreen';
import HomeScreen from './HomeScreen';
import MatchScreen from './MatchScreen';
import SettingsScreen from './SettingsScreen'
import FriendsProfileBio from '../components/FriendsProfileBio';
import { TabNavigator, StackNavigator } from 'react-navigation';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

type Route = {
  key: string,
  icon: string,
};

type State = NavigationState<Route>;

export default class AllScreen extends PureComponent<void, *, State> {
  static title = 'top bar';
  static appbarElevation = 0;

  state: State = {
    index: 0,
    routes: [
      { key: '1', icon: 'ios-people', title: 'Profile'  },
      { key: '2', icon: 'md-search', title: 'Match'  },
      { key: '3', icon: 'md-settings', title: 'Settings' },

    ],
  };

  _handleChangeTab = index => {
    this.setState({
      index,
    });
  };

  _renderIcon = ({ route }) => {
    return <Ionicons name={route.icon} size={20} color="white" />;
  };

  _renderHeader = props => {
    return (
      <TabBar
        {...props}
        indicatorStyle={styles.indicator}
        renderIcon={this._renderIcon}
        style={styles.tabbar}
        tabStyle={{size: 10}}
      />
    );
  };


  _renderScene = ({ route }) => {
    switch (route.key) {
      case '1':
      return (
        <FriendsScreen
          state={this.state}
          navigator={this.props.navigation}
          style={{ backgroundColor: '#000000' }}
        />
      );

      case '2':
      return (
        <MatchScreen
          navigator={this.props.navigation}
          state={this.state}
          style={{ backgroundColor: '#000000' }}
        />
      );
      case '3':
        return (
          <SettingsScreen
            navigator={this.props.navigation}
            state={this.state}
            style={{ backgroundColor: '#000000' }}
          />
        );
      default:
        return null;
    }
  };

  render() {
    return (
      <TabViewAnimated
        style={[styles.container, this.props.style]}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onRequestChangeTab={this._handleChangeTab}

      />
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  tabbar: {
  backgroundColor: '#6adaa8',
  paddingTop: 15,
  elevation: 4,
  shadowColor: 'black',
  shadowOpacity: 0.1,
  shadowRadius: StyleSheet.hairlineWidth,
  shadowOffset: {
    height: StyleSheet.hairlineWidth,
  },
}
});
