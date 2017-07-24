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


export default class MatchScreen extends Component {
  constructor(props){
    super(props);

    this.state = ({
      topic: '',
      matchedUser: '',
    });

  }

  fetchMatch() {
    console.log('asdfasdfasdf');
    console.log(this.state.topic);
    console.log(this.props.signedIn);
    const endPoint = `${backEnd}/${this.state.topic}/${this.props.signedIn.split('.')[0]}`;
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
        firebase.database().ref('/blahj').set(true);
        firebase.database().ref(`/Match/${listenPath}`).on('value', (data) => {
            if(!data.val()){
              return;
            }
            console.log('hello dude');
            // set up sendBird stuff
            Alert.alert(`You are matched with ${data.val()}`);
            this.setState({matchedUser: data.val()});
            console.log('this is this.props ' ,this.props);
            this.props.navigator.navigate('ChatScreen', {
              username1: listenPath,
              username2: this.state.matchedUser,
              userObj: this.props.signedinuserObject
            });
            console.log('this is USEROBJECT ' ,this.props.signedinuserObject);

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
            <Image resizeMode="contain" style={styles.imgStyle3} source={require('../assets/icons/com.png')} />
            <Text style={{fontSize: 35, color: '#ffffff'}}>
              Find a Match
            </Text>
              <Picker
                style={styles.picker}
                selectedValue={this.state.topic}
                itemStyle={styles.itemPicker}
                onValueChange={(itemValue, itemIndex) => this.setState({topic: itemValue})}>
                <Picker.Item label="Select one" value="" />
                <Picker.Item label="Depression" value="Depression" />
                <Picker.Item label="Anxiety" value="Anxiety" />
                <Picker.Item label="Family Issues" value="Family Issues" />
                <Picker.Item label="Relationship" value="Relationship" />
                <Picker.Item label="School" value="School" />
              </Picker>
          <Button
            buttonStyle={styles.buttonStyle}
            raised
            title='MATCH'
            onPress={ () => this.fetchMatch()}
            >
          </Button>
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
    backgroundColor:'#000000',
    borderRadius: 3,
  },
  picker: {
    width: 150,
    color: '#ffffff'
  },
  itemPicker: {
    color: '#ffffff'
  },
  mainText: {
    // color: '#fff',
    // fontSize: 30,
    // textAlign: 'center',
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    // fontFamily: 'HelveticaNeue',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
  },

  imgStyle3: {
    bottom: 14,
    width: 230,
    height: 230,
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
    marginTop: 15,
    borderRadius: 10,
    marginBottom: 15,

  },
});
