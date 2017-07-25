import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView } from 'react-native';
import FriendsList from '../components/FriendsList';
import UserProfile from '../components/UserProfile';
export default class FriendsScreen extends Component {

    render(){
      return (
        <View style={styles.outside}>
            <FriendsList
              navigator={this.props.navigator}
              ref={el => (this._first = el)}
              style={[styles.list, { backgroundColor: '#000' }]}
            />
          <View style={styles.profile}>
            <UserProfile/>
          </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#6adaa8',
  },
  outside : {
    flex: 1,
    flexDirection: 'row',
  },
  friendsBar: {
    flex: 2,
  },
  profile: {
    flex: 2,
    backgroundColor: '#000',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
