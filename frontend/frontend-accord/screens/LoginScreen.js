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
			console.log('Error logging in :', err);
		});
	}

  render() {
    return (
			<KeyboardAwareScrollView
				style={{ backgroundColor: '#fcf6e3' }}
				resetScrollToCoords={{ x: 0, y: 0 }}
				contentContainerStyle={styles.container}
				scrollEnabled={true}
				>
			<View style={styles.container}>
			<View style={{backgroundColor: 'transparent'}}>
				<Image style={{width:280 , height: 70, bottom: 65, alignSelf: 'auto'}} source={require('../assets/icons/icon2.png')} />
			</View>
					<Text style={styles.textBig}>Login</Text>
          <TextInput
            style={{height: 40, paddingTop: 10, textAlign: "center", color: '#FFC67C'}}
            placeholder="Enter Email"
            placeholderTextColor="#808080"
            onChangeText={(text) => this.setState({email: text})}
          />
          <TextInput
            style={{height: 40, paddingTop: 10, textAlign: "center", color: '#FFC67C'}}
            placeholder="password"
            placeholderTextColor="#808080"
            secureTextEntry={true}
            onChangeText={(text) => this.setState({password: text})}
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
		</KeyboardAwareScrollView>
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
  textBig: {
    fontSize: 36,
    textAlign: 'center',
    margin: 10,
    color: '#6adaa8',
		fontWeight: 'bold',
		...Platform.select({
			ios: {
				fontFamily:'Avenir'
			},
			android: {
				fontFamily: 'Roboto'
			}
		})
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
)(LoginScreen);
