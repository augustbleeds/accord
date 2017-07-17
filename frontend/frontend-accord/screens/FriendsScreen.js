import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView } from 'react-native';
import FriendsList from '../components/FriendsList';
import UserProfile from '../components/UserProfile';
export default function FriendsScreen ({signedIn, signedinuserObject}) {
    console.log('FRIENDSSCREEN', signedIn)
    return (
      <View style={styles.outside}>
      <View style={[styles.page, styles.container]}>
      {/* <View style={styles.container}> */}
            <FriendsList
              signedIn={signedIn}
              ref={el => (this._first = el)}
              style={[styles.list, { backgroundColor: '#000' }]}
             />
      </View>
      <View style={styles.profile}>
        <UserProfile
          signedIn={signedIn}
          signedinuserObject={signedinuserObject}
          />
      </View>
    </View>
    );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#6adaa8',
  },
  outside : {
    flex: 1,
    flexDirection: 'row'
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
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
    // alignItems: 'flex-end',
    // justifyContent: 'flex-end',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
