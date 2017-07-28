import React, { Component } from 'react';
import { View, TouchableOpacity, Text} from 'react-native';

export default class Enter extends Component {
  render(){
    return(
      <View style={{backgroundColor: "#fcf6e3", flex: 1, flexDirection: 'row'}}>
      <TouchableOpacity
        onPress={() => this.props.goToSignUp()}
        style={{backgroundColor: "#6ADAA8", flex: 1, borderRightWidth: 1, borderColor: '#fcf6e3',  color: '#fcf6e3', justifyContent: 'center', alignItems: 'center'}}
        >
        <Text style={{color: 'white'}}>
          Sign Up
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => this.props.goToLogIn()}
        style={{backgroundColor: "#6ADAA8", flex: 1, borderLeftWidth: 1, borderColor: '#fcf6e3', color: '#fcf6e3', justifyContent: 'center', alignItems: 'center'}}
        >
        <Text style={{color: 'white'}}>
          Log In
        </Text>
      </TouchableOpacity>
    </View>
    );
  }
}
