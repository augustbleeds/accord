import React, { Component } from 'react';
import {AsyncStorage, Platform, Alert, View, Text, StyleSheet, ListView, Image, Picker, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { TabNavigator, StackNavigator } from 'react-navigation';
import ModalDropdown from 'react-native-modal-dropdown';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import setUpPushNotifications from '../services/push_notifications';
import Expo, {Notifications} from 'expo';
import listenForMatch from '../listenForMatch';


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
        Alert.alert('You will be notified when there is a match!');
        AsyncStorage.setItem('matchListen', JSON.stringify({ myUserId: this.state.myUserId, blurb: this.state.blurb }));
        listenForMatch(this.state.myUserId, this.state.blurb, this.props.user, this.props.navigator);
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
                placeholder='...Write a short blurb here!'
                placeholderTextColor="#FFC67C"
                style={{backgroundColor:"#fcf6e3", height: 60, width: 150, fontSize: 15, color: '#FFC67C'}}
              >
              </TextInput>
            </View>
              <Picker
                style={styles.picker}
                selectedValue={this.state.topic}
                itemStyle={styles.itemPicker}
                onValueChange={(itemValue, itemIndex) => this.setState({topic: itemValue})}>
                <Picker.Item label="Select a Topic" value="" />
                {/* <Picker.Item label="Feel Sad?" value="Sad" /> */}
                {/* <Picker.Item label="Feel Anxious?" value="Anxiety" /> */}
                {/* <Picker.Item label="Feel Alone?" value="Alone" /> */}
                {/* <Picker.Item label="Feel Discriminated?" value="Discrimination" /> */}
                {/* <Picker.Item label="Relationship?" value="Relationship" /> */}
                <Picker.Item label="Social/Relationship?" value="Relationship" />
                <Picker.Item label="School/Work?" value="School" />
                <Picker.Item label="Family?" value="Family" />
              </Picker>
          <Button
            buttonStyle={styles.buttonStyle}
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
    backgroundColor:'#fcf6e3',
    borderRadius: 3,
  },
  picker: {
    width: 150,
    color: '#ffffff',
  },
  itemPicker: {
    color: '#6adaa8'
  },
  mainText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
  },

  imgStyle3: {
    bottom: 14,
    width: 230,
    height: 230,
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
