import React, {Component} from 'react';
import {View, Text, AsyncStorage } from 'react-native';
import Slides from '../components/slides';
import Swipers from '../components/swiper';
import _ from 'lodash';
import {AppLoading} from 'expo';
import { connect } from 'react-redux';
import { loadStoredUserInfo } from '../actions/index';

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
    // why did we have this???
    // TODO: add if statement here to check if reducer already has something on initial login
    if(JSON.stringify(this.props.user) === '{}'){
      AsyncStorage.getItem('user')
      .then((result) => {
        console.log('When WelcomeScreen mounts result is', result);
        if (result) {
          this.props.addStoredUser(JSON.parse(result));
          this.props.navigation.navigate('AllScreen');
        }else{
          console.log('debbo was wrong >:(');
        }
      })
      .catch((err) => {
        console.log('error w/ AsyncStorage', err);
      })
    }
  }

  render() {
    return(
      <Swipers
          onSlidesComplete={this.onSlidesComplete}
          onLoginComplete={this.onLoginComplete}
       />
    )
  }
}

const mapStateToProps = ({user}) => {
	return {user};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addStoredUser: (userJson) => {
			return loadStoredUserInfo(dispatch, userJson);
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
