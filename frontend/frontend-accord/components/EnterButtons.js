import React, { Component } from 'react';
import { View, TouchableOpacity, Text} from 'react-native';

export default class Enter extends Component {
  render(){
    return(
      <View style={{backgroundColor: "black", flex: 1, flexDirection: 'row'}}>
      <TouchableOpacity
        onPress={() => this.props.onSlidesComplete()}
        style={{backgroundColor: "#6ADAA8", flex: 1, borderRightWidth: 1, color: 'white', justifyContent: 'center', alignItems: 'center'}}
        >
        <Text style={{color: 'white'}}>
          Sign Up
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => this.props.onLoginComplete()}
        style={{backgroundColor: "#6ADAA8", flex: 1, borderLeftWidth: 1, color: 'white', justifyContent: 'center', alignItems: 'center'}}
        >
        <Text style={{color: 'white'}}>
          Log In
        </Text>
      </TouchableOpacity>
    </View>
    );
  }
}
