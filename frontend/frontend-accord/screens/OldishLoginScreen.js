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
	Alert} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';
const backgroundImg = require('../assets/icons/backgroundimg.png')
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
      <View style={styles.container}>
        <Image
          source={backgroundImg}
          style={{flex:1, paddingTop: 30, width: null, height: null}}
          rezieMode='cover'
        >
        {/* <View style={{flex: 1}}>
          <Image style={{width:280 , height: 70, bottom: 65, alignSelf: 'auto'}} source={require('../assets/icons/icon2.png')} />
        </View> */}
        <Text style={styles.textBig}>Login</Text>
				<ScrollView>
          <TextInput
            style={{height: 40, paddingTop: 10, textAlign: "center", color: '#fff'}}
            placeholder="Enter Email"
            placeholderTextColor="#808080"
            onChangeText={(text) => this.setState({email: text})}
          />
          <TextInput
            style={{height: 40, paddingTop: 10, textAlign: "center", color: '#fff'}}
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
					</ScrollView>
        </Image>
      </View>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  textBig: {
    fontSize: 36,
    textAlign: 'center',
    margin: 10,
    color: '#fff',
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
