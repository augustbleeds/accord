import React, { Component } from 'react';
import { Platform, TouchableOpacity, Button, Image, View, Text, ScrollView, Dimensions, StyleSheet, Alert} from 'react-native';
import EnterButtons from './EnterButtons'
import Swiper from 'react-native-swiper';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class swiperStyles extends Component {
  render(){
    return (
      <View style={{flex: 1}}>
      <View style={{flex: 13}}>
      <Swiper
        loop={false}
        dot={<View style={{backgroundColor: 'gray', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 50}} />}
        activeDot={<View style={{backgroundColor: 'white', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 50}} />}
        >
        <View style={styles.slide}>
          <Image resizeMode="cover" style={styles.iconStyle} source={require('../assets/icons/newlogo1.png')} />
          <View><Text style={styles.Maintext}>Welcome</Text></View>
          <View><Text style={styles.secondText}>Swipe to Learn More</Text></View>
        </View>
        <View style={styles.slide}>
          <Image resizeMode="cover" style={styles.imgStyle} source={require('../assets/icons/lock.png')} />
          <View><Text style={styles.Maintext}>Safe and Secure</Text></View>
          <View><Text style={styles.secondText}>Accord is designed
            to help you connect with other students going through similar life events. Share in a safe and
            secure environment.
          </Text></View>
        </View>
        <View style={styles.slide}>
          <Image resizeMode="cover" style={styles.imgStyle2} source={require('../assets/icons/talk.png')} />
          <View><Text style={styles.Maintext}>Voice your Story</Text></View>
          <View><Text style={styles.secondText}>
            We believe that authenticity is cool, real, and emotionally healthy.
            It deserves a higher priority in our lives and should be built into the way we connect with others.
          </Text></View>
        </View>
        <View style={styles.slide}>
          <View><Text style={[styles.Maintext, {bottom: 15}]}>Start Now!</Text></View>
        </View>
      </Swiper>
    </View>
    <EnterButtons
      goToSignUp={() => this.props.goToSignUp()}
      goToLogIn={() => this.props.goToLogIn()}
    />
    </View>
    );
  }
}

const styles = {
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
    backgroundColor: '#34495e',
  },
  Maintext: {
    fontSize: 26,
    color: '#6ADAA8',
    fontWeight:'bold',
    ...Platform.select({
      ios: {
        fontFamily:'Avenir'
      },
      android: {
        fontFamily: 'Roboto'
      }
    })
  },
  iconStyle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    bottom: 12,
    width: 300,
    height: 100,
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
  secondText: {
    fontSize: 16,
    color: '#FAA63A',
    textAlign: 'center',
    padding: 20,
    // fontWeight:'bold',
    fontStyle:'italic',
    ...Platform.select({
      ios: {
        fontFamily:'Avenir'
      },
      android: {
        fontFamily: 'Roboto'
      }
    })
  },
};
