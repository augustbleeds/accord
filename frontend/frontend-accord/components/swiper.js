import React, { Component } from 'react';
import { TouchableOpacity, Button, Image, View, Text, ScrollView, Dimensions, StyleSheet, Alert} from 'react-native';
// import { Button } from 'react-native-elements';
import Swiper from 'react-native-swiper';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class Enter extends Component {
  render(){
    return(
      <View style={{backgroundColor: "#6ADAA8", flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
      <TouchableOpacity
        onPress={() => this.props.onSlidesComplete()}
        style={{color: 'white'}}
        >
        <Text style={{color: 'white'}}>
          Sign Up
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => this.props.onLoginComplete()}
        style={{color: 'white'}}
        >
        <Text style={{color: 'white'}}>
          Log In
        </Text>
      </TouchableOpacity>
    </View>
    );
  }
}

export default class swiperStyles extends Component {
  render(){
    return (
      <View style={{flex: 1}}>
      <View style={{flex: 11}}>
      <Swiper
        dot={<View style={{backgroundColor: 'gray', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 50}} />}
        activeDot={<View style={{backgroundColor: 'white', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 50}} />}
        // dot={<View style={{backgroundColor: 'rgba(0,70,0,.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 75}} />}
        >
        <View style={[styles.slide,{ backgroundColor: '#000000' }]}>
          <Image style={{width:260, bottom: 30, alignSelf: 'auto'}} source={require('../assets/icons/icon2.png')} />
          <View level={10}><Text style={styles.Maintext}>Welcome</Text></View>
          <View level={15}><Text style={styles.secondText}>Swipe to Learn More</Text></View>
        </View>
        <View style={[styles.slide, { backgroundColor: '#000000' }]}>
          <Image resizeMode="cover" style={styles.imgStyle} source={require('../assets/icons/lock.png')} />
          <View level={-10}><Text style={styles.Maintext}>Safe and Secure</Text></View>
          <View level={5}><Text style={styles.secondText}>Accord is designed
            to help you connect with other students going through similar life events. Share in a safe and
            secure environment.
          </Text></View>
        </View>
        <View style={[styles.slide, { backgroundColor: '#000000' }]}>
          <Image resizeMode="cover" style={styles.imgStyle2} source={require('../assets/icons/talk.png')} />
          <View level={-10}><Text style={styles.Maintext}>Voice your Story</Text></View>
          <View level={5}><Text style={styles.secondText}>
            We believe that authenticity is cool, real, and emotionally healthy.
            It deserves a higher priority in our lives and should be built into the way we connect with others.
          </Text></View>
        </View>
        <View style={[styles.slide,{ backgroundColor: '#000000' }]}>
          <Image resizeMode="cover" style={styles.imgStyle3} source={require('../assets/icons/com.png')} />
          <View level={8}><Text style={[styles.Maintext, {bottom: 15}]}>Start Now!</Text></View>
        </View>
      </Swiper>
    </View>
    <Enter
      onSlidesComplete={() => this.props.onSlidesComplete()}
      onLoginComplete={() => this.props.onLoginComplete()}
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
    // showDoneButton: false,
    // showSkipButton: false
  },

  Maintext: {
    fontSize: 25,
    // fontFamily: 'HelveticaNeue-BoldItalic',
    color: '#fff',
  },

  imgStyle: {
    // display: 'block',
    justifyContent: 'flex-start',
    alignItems: 'center',
    bottom: 12,
    // resizeMode: "cover",
    width: 220,
    height: 220,
  },

  imgStyle2: {
    // display: 'block',fontFamily: 'HelveticaNeue-Bold',
    justifyContent: 'flex-start',
    alignItems: 'center',
    left: 10,
    bottom: 13,
    // resizeMode: "cover",
    width: 230,
    height: 230,
  },

  imgStyle3: {
    // display: 'block',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // resizeMode: "cover",
    bottom: 14,
    width: 270,
    height: 270,
  },

  secondText: {
    fontSize: 15,
    // fontFamily: 'HelveticaNeue',
    color: '#808080',
    textAlign: 'center',
    padding: 20
  },

  buttonLogInStyle: {
    flex: 1,
    backgroundColor: '#000000',
    // marginTop: 15,
    // borderWidth: 2,
    // borderRadius: 10,
  },
  buttonSignUpStyle: {
    flex: 1,
    backgroundColor: '#6adaa8',
    // marginTop: 15,
    // borderWidth: 2,
    // borderRadius: 10,
  },
};
