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

  /**
   * [componentDidMount gets user info and or storedMatchData from AsyncStorage
   *  and redirects the user to the appropriate page ]
   * @return nothing
   */

  async componentDidMount(){
    try{
      if(JSON.stringify(this.props.user) === '{}'){

        const storedUser = await AsyncStorage.getItem('user');
        const storedMatchData = await AsyncStorage.getItem('matchListen');

        console.log('storedUser is', storedUser);
        console.log('storedmatchData is', storedMatchData);

        if(storedUser){
          console.log('in the thingy');
          this.props.addStoredUser(JSON.parse(storedUser));

          if(!storedMatchData){
            this.props.navigation.navigate('AllScreen');
            return;
          }

          var matchedUserInfo = JSON.parse(storedMatchData);
          listenForMatch(matchedUserInfo.myUserId, matchedUserInfo.blurb, this.props.user, this.props.navigation);
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
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
