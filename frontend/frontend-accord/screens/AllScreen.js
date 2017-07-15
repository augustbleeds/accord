import type { NavigationState } from 'react-native-tab-view/types';

import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import FriendsScreen from './FriendsScreen';
import HomeScreen from './HomeScreen';
import MatchScreen from './MatchScreen';
import FriendsProfileBio from '../components/FriendsProfileBio';
import ChatScreen from './ChatScreen';
import { TabNavigator, StackNavigator } from 'react-navigation';

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
      { key: '1', icon: 'ios-home', title: 'HOME' },
      { key: '2', icon: 'ios-people', title: 'PROFILES'  },
      { key: '3', icon: 'md-search', title: 'MATCH'  },
      { key: '4', icon: 'ios-chatbubbles', title: 'CHAT'  },

    ],
  };

  _handleChangeTab = index => {
    this.setState({
      index,
    });
  };

  _renderIcon = ({ route }) => {
    return <Ionicons name={route.icon} size={24} color="white" />;
  };

  _renderHeader = props => {
    return (
      <TabBar
        {...props}
        indicatorStyle={styles.indicator}
        renderIcon={this._renderIcon}
        style={styles.tabbar}
      />
    );
  };


  _renderScene = ({ route }) => {
    switch (route.key) {
      case '1':
        return (
          <HomeScreen
            state={this.state}
            navigator={this.props.navigation}
            style={{ backgroundColor: '#000000' }}
          />
        );
      case '2':
        return (
          <FriendsScreen
            signedIn={this.props.navigation.state.params.user}
            navigator={this.props.navigation}
            state={this.state}
            style={{ backgroundColor: '#000000' }}
          />
        );
      case '3':
        return (
          <MatchScreen
            signedIn={this.props.navigation.state.params.user}
            navigator={this.props.navigation}
            state={this.state}
            style={{ backgroundColor: '#000000' }}
          />
        );
      case '4':
        return (
          <ChatScreen
            signedIn={this.props.navigation.state.params.user}
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
    console.log('PROPS', this.props.navigation.state.params.user);
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
  },
  tabbar: {
  backgroundColor: '#6adaa8',
  elevation: 4,
  shadowColor: 'black',
  shadowOpacity: 0.1,
  shadowRadius: StyleSheet.hairlineWidth,
  shadowOffset: {
    height: StyleSheet.hairlineWidth,
  },
}
});
