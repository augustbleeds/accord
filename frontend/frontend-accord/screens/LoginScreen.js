import React, {Component} from 'react';
import {
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
	Dimensions,
	Platform,
	Alert} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const SCREEN_HEIGHT = Dimensions.get('window').height;

// the reducer, and Provider for connection react-redux
import { connect } from 'react-redux';
import { loadUserInfo } from '../actions/index';


class LoginScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }

  onRegisterComplete = () => {
    this.props.navigation.navigate('Welcome');
  }

	goBackSubmit() {
		this.props.navigation.navigate('Welcome');
	}

	// set async storage and the reducer once upon login, and navigate to AllScreen
	loginSubmit() {
		var self = this;
		if(!self.state.email || !self.state.password){
			Alert.alert('Please fill in your email and password!');
			return;
		}
		self.props.addUser(self.state.email, self.state.password)
		.then(() => {
			if(JSON.stringify(self.props.user) === '{}' ){
				Alert.alert('Username or Password is incorrect. Please try again!');
				return;
			}else{
				return AsyncStorage.setItem('user', JSON.stringify(self.props.user))
				.then(() => {
					this.props.navigation.navigate('AllScreen');
				})
			}
		})
		.catch((err) => {
			Alert.alert(err.message);
			console.log('Error logging in :', err);
		});
	}

  render() {
    return (
			<KeyboardAvoidingView
				behavior="padding"
				style={styles.container}>
				<View style={styles.logoContainer}>
					<Image style={styles.logo} source={require('../assets/icons/icon2.png')} />
				</View>
				<View style={{padding: 20}}>
					<TextInput
						keyboardType="email-address"
						autoCapitalize="none"
						returnKeyType="next"
						onSubmitEditing={() => this.passwordInput.focus() }
						underlineColorAndroid= 'transparent'
						style={styles.input}
						placeholder="email"
						onChangeText={(text) => this.setState({email: text})}
					/>
					<TextInput
						autoCapitalize="none"
						returnKeyType="go"
						style={styles.input}
						underlineColorAndroid= 'transparent'
						placeholder="password"
						secureTextEntry={true}
						onChangeText={(text) => this.setState({password: text})}
						ref={(input) => this.passwordInput = input}
					/>
					<Button
						buttonStyle={styles.buttonStyle}
						onPress={ () => this.loginSubmit()}
						title="Log In"
					/>
					<Button
						buttonStyle={styles.buttonStyle}
						onPress={ () => this.goBackSubmit()}
						title="Go Back"
					/>
				</View>
			</KeyboardAvoidingView>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495e',
  },
	logo: {
		width: 280,
		height: 70,
	},
	logoContainer: {
		alignItems: 'center',
		flexGrow: 1,
		justifyContent: 'center',
	},
  input : {
		height: 40,
		backgroundColor: 'rgba(255,255,255,0.7)',
		color: '#34495e',
		paddingHorizontal: 10,
		marginBottom: 20,
	},
  buttonStyle: {
    backgroundColor: '#6adaa8',
		marginBottom: 10,
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
)(LoginScreen);
