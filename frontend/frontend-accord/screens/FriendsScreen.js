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
            />
            <UserProfile/>
            {/* <View style={{flex: 1, backgroundColor: 'blue'}}>

            </View>
            <View style={{flex: 3, backgroundColor: 'red'}}>

            </View> */}
        </View>
      );
    }
}

const styles = StyleSheet.create({
  outside : {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'black',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
});
