import React, {Component} from 'react';
import {View, Text } from 'react-native';
import Slides from '../components/slides';
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
  // async componentWillMount() {
  //   let token = await AsyncStorage.getItem('fb_token');
  //
  //   if(token) {
  //     this.props.navigation.navigae('map');
  //     this.setState({ token });
  //
  //   } else {
  //     this.setState({ token: false });
  //   }
  // }

  render() {
    // if(_.isNull(this.state.token)) {
    //   return<AppLoading />;
    // }
    return(
      <Slides
        data={SLIDE_DATA}
        onSlidesComplete={this.onSlidesComplete}
        onLoginComplete={this.onLoginComplete}
      />
    )
  }
}

export default WelcomeScreen;
