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
        <View style={[styles.slide,{ backgroundColor: '#fcf6e3' }]}>
          <Image style={{width:260, bottom: 30, alignSelf: 'auto'}} source={require('../assets/icons/icon2.png')} />
          <View level={10}><Text style={styles.Maintext}>Welcome To Accord</Text></View>
          <View level={15}><Text style={styles.secondText}>Swipe to Learn More</Text></View>
          <Button
            title="Sign Up"
            raised
            buttonStyle={styles.buttonSignUpStyle}
            onPress={() => {console.log('pressed');
            this.props.onSlidesComplete()}}
          />
          <Button
            title="Log In"
            raised
            buttonStyle={styles.buttonLogInStyle}
            onPress={this.props.onLoginComplete}
          />
        </View>
        <View style={[styles.slide, { backgroundColor: '#fcf6e3' }]}>
          <Image resizeMode="cover" style={styles.imgStyle} source={require('../assets/icons/lock.png')} />
          <View level={-10}><Text style={styles.Maintext}>Safe and Secure</Text></View>
          <View level={5}><Text style={styles.secondText}>Accord is designed
            to help you share your story and be emotionally healthy in a safe and
            secure environment.
          </Text></View>
          <Button
            title="Sign Up"
            raised
            buttonStyle={styles.buttonSignUpStyle}
            onPress={this.props.onSlidesComplete}
          />
          <Button
            title="Log In"
            raised
            buttonStyle={styles.buttonLogInStyle}
            onPress={this.props.onLoginComplete}
          />
        </View>
        <View style={[styles.slide, { backgroundColor: '#fcf6e3' }]}>
          <Image resizeMode="cover" style={styles.imgStyle2} source={require('../assets/icons/talk.png')} />
          <View level={-10}><Text style={styles.Maintext}>Voice your Story</Text></View>
          <View level={5}><Text style={styles.secondText}>
            These are people who are waiting to help you. They probably have gone through
            the same things you are going through. They can help.
          </Text></View>
          <Button
            title="Sign Up"
            raised
            buttonStyle={styles.buttonSignUpStyle}
            onPress={this.props.onSlidesComplete}
          />
          <Button
            title="Log In"
            raised
            buttonStyle={styles.buttonLogInStyle}
            onPress={this.props.onLoginComplete}
          />
        </View>
        <View style={[styles.slide,{ backgroundColor: '#fcf6e3' }]}>
          <Image resizeMode="cover" style={styles.imgStyle3} source={require('../assets/icons/com.png')} />
          <View level={8}><Text style={[styles.Maintext, {bottom: 15}]}>Start Now!</Text></View>
          <Button
            title="Sign Up"
            raised
            buttonStyle={styles.buttonSignUpStyle}
            onPress={this.props.onSlidesComplete}
          />
          <Button
            title="Log In"
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
    },

    Maintext: {
      fontSize: 25,
      color: '#fff',
    },

    imgStyle: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      bottom: 12,
      width: 220,
      height: 220,
    },

    imgStyle2: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      left: 10,
      bottom: 13,
      width: 230,
      height: 230,
    },

    imgStyle3: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      bottom: 14,
      width: 270,
      height: 270,
    },

    secondText: {
      fontSize: 15,
      color: '#808080',
      textAlign: 'center',
      padding: 20
    },

    buttonLogInStyle: {
      backgroundColor: '#000000',
      marginTop: 15,
      borderWidth: 2,
      borderRadius: 10,
    },
    buttonSignUpStyle: {
      backgroundColor: '#6adaa8',
      marginTop: 15,
      borderWidth: 2,
      borderRadius: 10,
    },
  };
