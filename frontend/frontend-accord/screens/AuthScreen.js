'use strict';
import React, { Component } from 'react';
import { KeyboardAvoidingView, TouchableOpacity, Image, ScrollView, Alert, AppRegistry, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// var t = require('tcomb-form-native');
import t from '../style/authStyle';
import * as firebase from 'firebase';
import stylesheet from '../style/authStyle';

var Form = t.form.Form;

const backgroundImage = require('../assets/icons/backgroundimg.png');
const goBackButton = require('../assets/icons/back.png');


const nickname = t.refinement(t.String, nickname => {
  return nickname.length <=12;
})

const Email = t.refinement(t.String, email => {
  const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //or any other regexp
  return reg.test(email);
});

const StrongPassword = t.refinement(t.String, password => {
  return password.length >= 6;
});


// here we are: define your domain model
var Person = t.struct({
  nickname: nickname,              // a required string
  email: Email,
  gender: t.String,
  school: t.String,
  description: t.String,
  password: StrongPassword,
});

var options = {
  fields: {
    email : {
      error: 'Insert a valid .edu email address'
    },
    password: {
      password: true,
      secureTextEntry: true,
      error: 'Insert a password greater than 6 characters'
    },
    nickname: {
      error: 'Nickname should be less than 12 characters'
    }
  }
};


class AwesomeProject extends Component {
  constructor(props){
    super(props);
  }

  registerSubmit({nickname, email, gender, school, description, password}) {
		firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(() => {
			return fetch('https://us-central1-accord-18bdf.cloudfunctions.net/route/register', {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({nickname, password, gender, email, school, desc: description})
			})
		})
		.then((response) => response.json())
		.then((responseJson) => {
			if(responseJson !== null) {
				this.props.navigation.navigate('Login')
				console.log(responseJson);
			}else{
				Alert.alert('Something went wrong, please try again.');
			}
		})
		.catch((err) => {
      // err.code ==== auth/email-already-in-use
      Alert.alert(err.message);
		});
	}


  onPress() {
    console.log('navigation exists :O', this.props.navigation)
    Alert.alert('pressed button');
    // call getValue() to get the values of the form
    var value = this.form.getValue();
    if (value) { // if validation fails, value will be null
      // Alert.alert('value:' + JSON.stringify(value.email));
      // console.log(value); // value here is an instance of Person
      this.registerSubmit(value);
    }
  }

  onGoBack() {
    this.props.navigation.navigate('Welcome');
  }

  render() {
    return (
      <KeyboardAwareScrollView
          style={{ backgroundColor: '#4c69a5' }}
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.container}
          scrollEnabled={true}
      >
      <View
        style={styles.container}
        >
        <Image
          source ={backgroundImage}
          style={{flex:1, paddingTop: 30, width: null, height: null}}
          rezieMode='cover'
          >
        <View style={{marginRight: 5, marginBottom: 40, backgroundColor: 'transparent'}}>
        <TouchableOpacity
          onPress={() => this.onGoBack() }>
          <Image
            source={goBackButton}
            style={{width: 30, height: 30}}
            rezieMode='contain'
            >
            </Image>
        </TouchableOpacity>
      </View>
        <Form
          ref={(form) => {this.form = form}}
          type={Person}
          options={options}
        />
        <TouchableHighlight style={styles.button} onPress={() => this.onPress()} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableHighlight>
      </Image>
    </View>
  </KeyboardAwareScrollView>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#6da5a6',
    borderColor: '#6da5a6',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

export default AwesomeProject;
