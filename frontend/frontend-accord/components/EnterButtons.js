import React, { Component } from 'react';
import { StyleSheet, Platform, View, TouchableOpacity, Text} from 'react-native';

export default class Enter extends Component {
  render(){
    return(
      <View style={{backgroundColor: "#fcf6e3", flex: 1, flexDirection: 'row'}}>
      <TouchableOpacity
        onPress={() => this.props.goToSignUp()}
        style={{backgroundColor: "#6ADAA8", flex: 1, borderRightWidth: 1, borderColor: '#fcf6e3',  color: '#fcf6e3', justifyContent: 'center', alignItems: 'center'}}
        >
        <Text style={styles.buttonText}>
          Sign Up
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => this.props.goToLogIn()}
        style={{backgroundColor: "#6ADAA8", flex: 1, borderLeftWidth: 1, borderColor: '#fcf6e3', color: '#fcf6e3', justifyContent: 'center', alignItems: 'center'}}
        >
        <Text style={styles.buttonText}>
          Log In
        </Text>
      </TouchableOpacity>
    </View>
    );
  }
}

var styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
    ...Platform.select({
      ios: {
        fontFamily:'Avenir'
      },
      android: {
        fontFamily: 'Roboto'
      }
    })
  }
});
