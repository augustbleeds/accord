import React, {Component} from 'react';
import { Image, View, Text, ScrollView, Dimensions, StyleSheet, Alert} from 'react-native';
import { Button } from 'react-native-elements';
import AppIntro from 'react-native-app-intro';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class slideStyles extends Component {

  doneBtnHandle = () => {

  }
    render() {
      return (
        <AppIntro
          onDoneBtnClick={this.doneBtnHandle}
          showSkipButton={false}
          showDoneButton={false}
          >
        <View style={[styles.slide,{ backgroundColor: '#000000' }]}>
          <Image style={{width:400 , heigth: 70, bottom: 65, alignSelf: 'auto'}} source={require('../assets/icons/icon2.png')} />
          <View level={10}><Text style={styles.Maintext}>Welcome To Accord</Text></View>
          <View level={15}><Text style={styles.secondText}>Swipe Right to Learn More</Text></View>
        </View>
        <View style={[styles.slide, { backgroundColor: '#000000' }]}>
          <View level={-10}><Text style={styles.Maintext}>About Accord</Text></View>
          <View level={5}><Text style={styles.secondText}>Accord is designed to help you share and be emotionally healthy</Text></View>
        </View>
        <View style={[styles.slide,{ backgroundColor: '#000000' }]}>
          <View level={8}><Text style={styles.Maintext}>Start Now!</Text></View>
          <Button
            title="Sign Up!"
            raised
            buttonStyle={styles.buttonSignUpStyle}
            onPress={this.props.onSlidesComplete}
          />
          <Button
            title="Log In!"
            raised
            buttonStyle={styles.buttonLogInStyle}
            onPress={this.props.onLoginComplete}
          />
        </View>
      </AppIntro>
      );
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
      fontSize: 20,
      fontFamily: 'HelveticaNeue',
      color: '#fff',
      textAlign: 'center'
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
