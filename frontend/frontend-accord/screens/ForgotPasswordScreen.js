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

  class ForgotPasswordScreen extends Component {
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
              returnKeyType="next"
              onSubmitEditing={() => this.passwordInput.focus() }
              underlineColorAndroid= 'transparent'
              placeholderTextColor="#34495e"
              style={styles.input}
              placeholder="email"
              onChangeText={(text) => this.setState({email: text})}
            />
            <Button
              buttonStyle={styles.buttonStyle}
              onPress={ () => this.loginSubmit()}
              title="Reset Password"
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
