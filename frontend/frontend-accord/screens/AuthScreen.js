'use strict';
import React, { Component } from 'react';
import { Alert, AppRegistry, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
var t = require('tcomb-form-native');

var Form = t.form.Form;

const Email = t.refinement(t.String, email => {
  const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //or any other regexp
  return reg.test(email);
});

// const StrongPassword = t.refinement(t.String, password =>
// });

// here we are: define your domain model
var Person = t.struct({
  nickname: t.String,              // a required string
  email: Email,
  gender: t.String,
  school: t.String,
  description: t.String,
  password: t.String,
});

var options = {
  fields: {
    email : {
      error: 'Insert a valid .edu '
    },
    password: {
      password: true,
      secureTextEntry: true
    }
  }
};


class AwesomeProject extends Component {

  onPress() {
    Alert.alert('after form');
    Alert.alert('pressed button');

    // call getValue() to get the values of the form
    var value = this.form.getValue();
    if (value) { // if validation fails, value will be null
      console.log(value); // value here is an instance of Person
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/* display */}
        <Form
          ref={(form) => {this.form = form}}
          type={Person}
          options={options}
        />
        <TouchableHighlight style={styles.button} onPress={() => this.onPress()} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

export default AwesomeProject;
