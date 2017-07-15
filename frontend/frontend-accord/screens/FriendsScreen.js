import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView } from 'react-native';
import FriendsList from '../components/FriendsList';
export default function FriendsScreen ({signedIn}) {
    console.log('FRIENDSSCREEN', signedIn)
    return (
      <View style={[styles.page, styles.container]}>
            <FriendsList
              signedIn={signedIn}
              ref={el => (this._first = el)}
              style={[styles.list, { backgroundColor: '#fff' }]}
             />
      </View>
    );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#6adaa8',

  },
  page: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  container: {
    backgroundColor: '#000000',
    borderRadius: 3,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
