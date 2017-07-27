import React, {Component} from 'react';
import { Text, AsyncStorage } from 'react-native';
import Swipers from '../components/swiper';
import { connect } from 'react-redux';
import { loadStoredUserInfo } from '../actions/index';
import listenForMatch from '../listenForMatch';

class WelcomeScreen extends Component {
  goToSignUp = () => {
    this.props.navigation.navigate('Auth');
  }

  goToLogIn = () => {
    this.props.navigation.navigate('Login');
  }

  componentDidMount() {
    // if user is not initialized in the reducer, get from the store
    if(JSON.stringify(this.props.user) === '{}'){
      AsyncStorage.getItem('user')
      .then((result) => {
        console.log('user in asyncstorage is', JSON.parse(result));
        // result will be null by default (different than the state)
        if (JSON.parse(result)) {
          this.props.addStoredUser(JSON.parse(result));
          return AsyncStorage.getItem('matchListen');
        }
        return null;
      })
      .then((result) => {
        console.log('result of matchListen is', result);
        // if matchedUser is null or doesn't exist
        if(!result){
          this.props.navigation.navigate('AllScreen');
          return;
        }

        var matchedUserInfo = JSON.parse(result);
        listenForMatch(matchedUserInfo.myUserId, matchedUserInfo.blurb, this.props.user, this.props.navigation);
      })
      .catch((err) => {
        console.log('error w/ AsyncStorage', err);
      })
    }


  }

  render() {
    return(
      <Swipers
          goToSignUp={this.goToSignUp}
          goToLogIn={this.goToLogIn}
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
