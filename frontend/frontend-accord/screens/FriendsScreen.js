import React, { Component } from 'react';
import { Platform, View, Text, StyleSheet, ListView } from 'react-native';
import FriendsList from '../components/FriendsList';
import UserProfile from '../components/UserProfile';
export default class FriendsScreen extends Component {

    render(){
      return (
        <View style={styles.outside}>
            <FriendsList
              navigator={this.props.navigator}
              ref={el => (this._first = el)}
            />
            <UserProfile/>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  outside : {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#34495e',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',

  },
});
