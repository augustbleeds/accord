import React, { Component } from 'react';
import { Alert, View, Text, StyleSheet, ListView, Image, Picker, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { TabNavigator, StackNavigator } from 'react-navigation';
import ModalDropdown from 'react-native-modal-dropdown';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import setUpPushNotifications from '../services/push_notifications';
import Expo, {Notifications} from 'expo';

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

class MatchScreen extends Component {
  constructor(props){
    super(props);
    this.state = ({
      topic: '',
      matchedUser: '',
      blurb: '',
      myUserId: this.props.user.email.split('.')[0],
    });
  }

  componentDidMount(){
    console.log('debbo match screen component mounted!');
    setUpPushNotifications(this.props.user.email.split('.')[0]);
    Notifications.addListener((notification) => {
      // where we redirect them to the chatscreen
    })

  }

  fetchMatch() {
    const endPoint = `${backEnd}/${this.state.topic}/${this.state.myUserId}`;
    fetch(endPoint, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.success === true) {
        Alert.alert('You will be notified when there is a match! :)');
        // listen for when this user is matched!
        firebase.database().ref(`/Match/${this.state.myUserId}`).on('value', (data) => {
            if(!data.val()){
              return;
            }
            Alert.alert(`You are matched with ${data.val()}`);
            this.setState({matchedUser: data.val()});
            // set Async for homescreen
            // AsyncStorage.setItem('matchedUser', this.state.matchedUser)


            this.props.navigator.navigate('ChatScreen', {
              username1: this.state.myUserId,
              username2: this.state.matchedUser,
              userObj: this.props.user,
              blurb: this.state.blurb,
            });
            // remove it from the database
            dbRootRef.child(`/Match/${this.state.myUserId}`).remove();
            // detach listeners
            dbRootRef.child(`/Match/${this.state.myUserId}`).off();
          });
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
            <View style={{color:'white',  borderRadius: 20, borderColor: '#6adaa8'}}>
              <TextInput
                multiline = {true}
                numberOfLines = {4}
                maxLength = {100}
                value = {this.state.blurb}
                onChangeText={(text) => {this.setState({blurb: text})}}
                placeholder='Write a short blurb here!'
                style={{backgroundColor:"#6adaa8", height: 60, width: 150, fontSize: 15}}
              >
              </TextInput>
            </View>
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
            onPress={ () => {this.fetchMatch()}}
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
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
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

const mapStateToProps = ({ user }) => {
	return { user };
};

export default connect(mapStateToProps, null)(MatchScreen);
