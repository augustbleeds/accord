import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView } from 'react-native';
import FriendsList from '../components/FriendsList';
import UserProfile from '../components/UserProfile';
export default class FriendsScreen extends Component {

    render(){
      return (
        <View style={styles.outside}>
          <View style={[styles.page, styles.container]}>
            <FriendsList
              signedIn={this.props.signedIn}
              signedinuserObject={this.props.signedinuserObject}
              navigator={this.props.navigator}
              ref={el => (this._first = el)}
              style={[styles.list, { backgroundColor: '#000' }]}
            />
          </View>
          <View style={styles.profile}>
            <UserProfile
              signedIn={this.props.signedIn}
              signedinuserObject={this.props.signedinuserObject}
            />
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
  page: {
    flex: 1.3,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  container: {
    backgroundColor: '#000000',
    borderRadius: 3,
  },
  profile: {
    flex: 2.3,
    backgroundColor: '#000',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
