import React, { Component } from 'react';
import {AsyncStorage, Platform, Alert, View, Text,
  StyleSheet, ListView, Image, Picker, TextInput,
KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import { TabNavigator, StackNavigator } from 'react-navigation';
import ModalDropdown from 'react-native-modal-dropdown';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import setUpPushNotifications from '../services/push_notifications';
import Expo, {Notifications} from 'expo';
import listenForMatch from '../listenForMatch';
import { matchUsersStatus } from '../actions/index';

// config setup used to be here but has been moved to listenForMatch
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
    setUpPushNotifications(this.props.user.email.split('.')[0]);
    Notifications.addListener((notification) => {
      // where we redirect them to the chatscreen
    });

  }

  fetchMatch() {
    if (this.props.user.searching) {
      Alert.alert('You can only have one match at a time!');
      return;
    }
    var self = this;
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
        self.props.matchStatus(true); //set match status of searching to be true
        // console.log('User is', this.props.user);
        // console.log('Searching is', this.props.user.searching);

        // update AsyncStorage to searching is true
        AsyncStorage.mergeItem('user', JSON.stringify({searching: true}));
        Alert.alert('You will be notified when there is a match!');
        AsyncStorage.setItem('matchListen', JSON.stringify({ myUserId: this.state.myUserId, blurb: this.state.blurb }));
        listenForMatch(this.state.myUserId, this.state.blurb, this.props.user, this.props.navigator, self.props.matchStatus);
      }
    })
    .catch((err) => {
      console.log('error', err)
    });
  }

  render(){
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}
        >
          <View style={styles.logoContainer}>
            <Image resizeMode="contain" style={styles.imgStyle3} source={require('../assets/icons/com.png')} />
          </View>
            <View style={{padding: 20}}>
              <TextInput
                underlineColorAndroid= 'transparent'
                // multiline = {true}
                // numberOfLines = {4}
                maxLength = {100}
                value = {this.state.blurb}
                onChangeText={(text) => {this.setState({blurb: text})}}
                placeholder="What's on Your Mind?"
                placeholderTextColor="#34495e"
                returnKeyType="go"
                style={styles.input}
              >
              </TextInput>

              <Picker
                style={styles.picker}
                selectedValue={this.state.topic}
                itemStyle={styles.itemPicker}
                onValueChange={(itemValue, itemIndex) => this.setState({topic: itemValue})}>
                <Picker.Item color='#6adaa8' label="Select a Topic" value="" />
                {/* <Picker.Item label="Feel Sad?" value="Sad" /> */}
                {/* <Picker.Item label="Feel Anxious?" value="Anxiety" /> */}
                <Picker.Item color='#6adaa8' label="Feel Alone?" value="Alone" />
                {/* <Picker.Item label="Feel Discriminated?" value="Discrimination" /> */}
                {/* <Picker.Item label="Relationship?" value="Relationship" /> */}
                <Picker.Item color='#6adaa8' label="Social/Relationship?" value="Relationship" />
                <Picker.Item color='#6adaa8' label="School/Work?" value="School" />
                <Picker.Item color='#6adaa8' label="Family?" value="Family" />
              </Picker>
          <Button
            buttonStyle={styles.buttonStyle}
            title='MATCH'
            onPress={ () => {this.fetchMatch()}}
            >
          </Button>
        </View>
      </KeyboardAvoidingView>
    );
  }

}

const styles = StyleSheet.create({
  logoContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
  input : {
    height: 70,
    backgroundColor: 'rgba(255,255,255,0.7)',
    color: '#34495e',
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    backgroundColor:'#34495e',
  },
  picker: {
    alignSelf: 'center',
    width: 250,
    color: '#6adaa8',
  },
  itemPicker: {
    color: '#6adaa8'
  },
  imgStyle3: {
    width: 200,
    height: 200,
  },
  buttonStyle: {
    backgroundColor: '#6adaa8',
    borderRadius: 10,
    marginBottom: 25,

  },
});

const mapStateToProps = ({ user }) => {
	return { user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    matchStatus: (searching) => {
			return matchUsersStatus(dispatch, searching);
		}
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MatchScreen);
