import React, {Component} from 'react';
import {
	Platform,
	StyleSheet,
	KeyboardAvoidingView,
	View,
	ActivityIndicator,
	TouchableOpacity,
	Image,
	TextInput,
	Text,
	ScrollView,
	AsyncStorage,
	Alert} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { loadUserInfo } from '../actions/index';
import * as firebase from 'firebase';


class SettingsScreen extends Component {
  constructor(props){
    super(props);
  }

	// set the async back to null, userReducer should be cleared
	SignOut() {
		firebase.auth().signOut()
			.then(() => {
				return AsyncStorage.setItem('user', JSON.stringify(null))
			})
			.then(() => {
				this.props.navigator.navigate('Welcome');
			})
			.catch((err) => {
				console.log('Error signing out: ', err);
			});
	}

	render() {
		return (
			<View style={styles.container}>
				<Button
					buttonStyle={styles.buttonStyle}
					onPress={ () => this.SignOut()}
					title="Sign Out"
				/>
			</View>
		)
	}
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fcf6e3',
  },
  buttonStyle: {
    backgroundColor: '#6adaa8',
    marginTop: 15,
		borderRadius: 10,
  }
});

const mapStateToProps = ({user}) => {
	return {user};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addUser: (email, password) => {
			return loadUserInfo(dispatch, email, password);
		}
	};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);
