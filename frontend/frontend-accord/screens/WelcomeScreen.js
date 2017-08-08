import React, {Component} from 'react';
import { Text, AsyncStorage,Platform } from 'react-native';
import Swipers from '../components/swiper';
import { connect } from 'react-redux';
import { loadStoredUserInfo } from '../actions/index';
import listenForMatch from '../listenForMatch';
import { matchUsersStatus } from '../actions/index';

class WelcomeScreen extends Component {
  goToSignUp = () => {
    this.props.navigation.navigate('Auth');
  }

  goToLogIn = () => {
    this.props.navigation.navigate('Login');
  }

  /**
   * [componentDidMount gets user info and or storedMatchData from AsyncStorage
   *  and redirects the user to the appropriate page ]
   * @return nothing
   */

  async componentDidMount(){
    try{
      // if the reducer is not initialized
      if(JSON.stringify(this.props.user) === '{}'){

        // AsyncStorage.clear()
        //   .then(() => {
        //     console.log('yay it cleared!');
        //   })

        // get user info and match data (if exists)
        const storedUser = await AsyncStorage.getItem('user');
        const storedMatchData = await AsyncStorage.getItem('matchListen');

        // console.log('storedUser is', storedUser);
        // console.log('of type', typeof storedUser);
        // console.log('storedmatchData is', storedMatchData);
        // console.log('of type', typeof storedMatchData);

        if(storedUser){
          this.props.addStoredUser(JSON.parse(storedUser));

          // console.log('MY USER IS', this.props.user);
          // console.log('MY SEARCHING IS', this.props.searching);

          // navigate to screen
          this.props.navigation.navigate('AllScreen');

          // listen if needed (is still called even if you navigate!)
          if(storedMatchData){
            var matchedUserInfo = JSON.parse(storedMatchData);
            listenForMatch(matchedUserInfo.myUserId, matchedUserInfo.blurb, this.props.user, this.props.navigation, this.props.matchStatus);
          }

        }
      }

    } catch(e) {
      console.log('Error in mount', e);
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
		},
    matchStatus: (searching) => {
      return matchUsersStatus(dispatch, searching);
    },
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
