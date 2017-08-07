import React, { Component } from 'react';
import {
	StyleSheet,
	KeyboardAvoidingView,
	View,
	TouchableOpacity,
	Image,
	TextInput,
	Text,
	AsyncStorage,
	Alert} from 'react-native';
  import { Button } from 'react-native-elements';
  import * as firebase from 'firebase';



  class ForgotPasswordScreen extends Component {
    constructor(props){
      super(props);
      this.state = {email: ''};
    }
    componentDidMount(){
      this.auth = firebase.auth();
    }

    resetPassword(emailAddress) {
      this.auth.sendPasswordResetEmail(emailAddress).then(function() {
        Alert.alert('Please check your inbox for reset instructions')
      }).catch(function(error) {
        // An error happened.
        console.log('Reset problem', error);
      });
    }

    goBackHome() {
      this.props.navigation.navigate('Welcome');
    }
    render() {
      return (
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.container}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require('../assets/icons/icon2.png')} />
            <Text style={styles.title}>
              Please enter the email address you used to create your account. We will send an email with password reset instructions.
            </Text>
          </View>
          <View style={{padding: 20}}>
            <TextInput
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="go"
              underlineColorAndroid= 'transparent'
              placeholderTextColor="#34495e"
              style={styles.input}
              placeholder="email"
              onChangeText={(text) => this.setState({email: text})}
            />
            <Button
              buttonStyle={styles.buttonStyle}
              onPress={ () => this.resetPassword(this.state.email)}
              title="Reset Password"
            />
            <Button
              buttonStyle={styles.buttonStyle}
              onPress={ () => this.goBackHome()}
              title="Go Back"
            />
          </View>
        </KeyboardAvoidingView>
      )
    }
  }

  const styles = StyleSheet.create({
    title: {
      color: '#FAA63A',
      marginTop: 10,
      textAlign: 'center',
    },
  	forgotPassword: {
  		alignItems: 'center',
  		marginBottom: 20,
  	},
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

  export default ForgotPasswordScreen;
