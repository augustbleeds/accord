import React, { Component } from 'react';
import { Alert, View, Text, StyleSheet, ListView, Image, Picker } from 'react-native';
import { Button } from 'react-native-elements';
import { TabNavigator, StackNavigator } from 'react-navigation';
import ModalDropdown from 'react-native-modal-dropdown';
import * as firebase from 'firebase';

// const CATEGORY = ['Family', 'Relationship', 'School', 'Depression', 'Anxiety']
var config = {
   apiKey: "AIzaSyDkhtl4JKhb_1aHL3ookaq0iSRsXmW1Hcg",
   authDomain: "accord-18bdf.firebaseapp.com",
   databaseURL: "https://accord-18bdf.firebaseio.com",
   projectId: "accord-18bdf",
   storageBucket: "accord-18bdf.appspot.com",
   messagingSenderId: "986125110855"
 };
firebase.initializeApp(config);
var dbRootRef = firebase.database().ref();
const backEnd = 'https://us-central1-accord-18bdf.cloudfunctions.net/route/user/match';

// dbRootRef.child('Match/test')
//   .on('child_added', data => {
//     Alert.alert('the child was added');
//   });

export default class MatchScreen extends Component {
  constructor(props){
    super(props);

    this.state = ({
      language: ''
    });

  }

  onMatchComplete() {
    this.props.navigation.navigate('ChatScreen');
  }
  fetchMatch() {
    console.log('asdfasdfasdf');
    console.log(this.state.language);
    console.log(this.props.signedIn);
    const endPoint = `${backEnd}/${this.state.language}/${this.props.signedIn.split('.')[0]}`;
    console.log('endpoint is', endPoint);
    fetch(endPoint, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)
      if(responseJson.success === true) {
        Alert.alert('You will be notified when there is a match! :)');
        // listen for when this user is matched!
        var listenPath = this.props.signedIn.split('.')[0];
        console.log('listen is', listenPath);
        firebase.database().ref(`/Match/${listenPath}`).on('value', (data) => {
            if(!data.val()){
              return;
            }
            console.log('hello dude');
            // set up sendBird stuff
            Alert.alert(`You are matched with ${data.val()}`);
            this.setState({matchedUser: data.val()});
            console.log('this is this.props ' ,this.props);
            this.props.navigator.navigate('ChatScreen', {username1: listenPath, username2: this.state.matchedUser});
            console.log('state is', this.state);
            // remove it from the database
            dbRootRef.child(`/Match/${listenPath}`).remove();
            // detach listeners
            dbRootRef.child(`/Match/${listenPath}`).off();
          });
        // dbRootRef.child(`/hello`).set(true);
      }
    })
    .catch((err) => {
      console.log('error', err)
    });
  }
  render(){
    return (
      <View style={[styles.page, styles.container]}>
        <View style={styles.container}>
          <Text style={styles.mainText}>
            MATCHING
            {this.state.language}
          </Text>
            <Picker
              selectedValue={this.state.language}
              onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
              <Picker.Item label="Depression" value="Depression" />
              <Picker.Item label="Anxiety" value="Anxiety" />
              <Picker.Item label="Family Issues" value="Family Issues" />
              <Picker.Item label="Relationship" value="Relationship" />
              <Picker.Item label="School" value="School" />
            </Picker>
          <Button
            buttonStyle={styles.buttonStyle}
            raised
            title={this.state.language}
            onPress={ () => this.fetchMatch()}
            >
          </Button>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor:'#fff',
    borderRadius: 3,
  },

  mainText: {
    color: '#fff',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 10
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  swipe: {
    color: '#808080',
    textAlign: 'center',
    fontSize: 12,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  buttonStyle: {
    backgroundColor: '#6adaa8',
    marginTop: 15
  },
});
