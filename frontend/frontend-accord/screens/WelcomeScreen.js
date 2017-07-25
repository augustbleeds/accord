import React, {Component} from 'react';
import {View, Text, AsyncStorage } from 'react-native';
import Slides from '../components/slides';
import Swipers from '../components/swiper';
import _ from 'lodash';
import {AppLoading} from 'expo';
const SLIDE_DATA = [
  {text: 'Welcome to Accord', color: '#000000', image: '../assets/icons/logo1'},
  {text: 'Some text here...', color: '#000000'},
  {text: 'Start Chatting!', color: '#000000'}
]
class WelcomeScreen extends Component {
  // state = {token: null}
  onSlidesComplete = () => {
    this.props.navigation.navigate('Auth');
  }

  onLoginComplete = () => {
    this.props.navigation.navigate('Login');

  }

  componentDidMount() {
    console.log("Debbie was here!")
    AsyncStorage.getItem('user')
    .then((result) => {
      if (result) {
        this.props.navigation.navigate('AllScreen');
      }else{
        console.log('debbo was wrong >:(');
      }
    })
    .catch((err) => {
      console.log('error w/ AsyncStorage', err);
    })
  }

  render() {
    // if(_.isNull(this.state.token)) {
    //   return<AppLoading />;
    // }
    return(
      <Swipers
          onSlidesComplete={this.onSlidesComplete}
          onLoginComplete={this.onLoginComplete}
       />
    )
  }
}

export default WelcomeScreen;
