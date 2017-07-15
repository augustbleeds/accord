import React, {Component} from 'react';
import { Image, View, Text, ScrollView, Dimensions, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import { Button } from 'react-native-elements';
import AppIntro from 'react-native-app-intro';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class FriendsProfileBio extends Component {

    render() {
      alert('hihi');
      return (
        <TouchableOpacity
          onPress={this.props.onPress}
          >
            <Text> Button </Text>
          </TouchableOpacity>
      )
  }
}
  const styles = {
    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: SCREEN_WIDTH,
      showDoneButton: false,
      showSkipButton: false
    },

    Maintext: {
      fontSize: 30,
      fontFamily: 'HelveticaNeue-BoldItalic',
      color: '#fff',
    },

    secondText: {
      fontSize: 15,
      fontFamily: 'HelveticaNeue',
      color: '#fff'
    },
    buttonLogInStyle: {
      backgroundColor: '#6adaa8',
      marginTop: 15
    },
    buttonSignUpStyle: {
      backgroundColor: '#6adaa8',
      marginTop: 15
    },
  };

  export default FriendsProfileBio;
