
import React, {Component} from 'react';
import {
	Alert,
	StyleSheet,
	KeyboardAvoidingView,
	View,
	ActivityIndicator,
	TouchableOpacity,
	Image,
	TextInput,
	Text,
	ScrollView,
} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

import { Button } from 'react-native-elements'

class AuthScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      nickname: '',
      password: '',
      email: '',
      gender: '',
      school: '',
      desc: ''
    }
  }
  onRegisterComplete = () => {
    this.props.navigation.navigate('Welcome');
  }

	gobackSubmit() {
		this.props.navigation.navigate('Welcome');
	}

  registerSubmit() {
    console.log("HIHIHI");
    fetch('https://us-central1-accord-18bdf.cloudfunctions.net/route/register', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nickname: this.state.nickname,
        password: this.state.password,
        gender: this.state.gender,
        email: this.state.email,
        school: this.state.school,
        desc: this.state.desc,
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson !== null) {
        this.props.navigation.navigate('Login')
        console.log(responseJson);
      }else{
				Alert.alert('Something went wrong, please try again.');
			}
    })
    .catch((err) => {
      alert("ERRRRR")
      console.log('error', err)
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textBig}>Let's Get Started!</Text>
					<ScrollView>
          <TextInput
            style={{height: 40, textAlign: "center", color: '#fff'}}
            placeholder="Email Address"
            placeholderTextColor="#808080"
            onChangeText={(text) => this.setState({email: text})}
          />
          <TextInput
            style={{height: 40, textAlign: "center", color: '#fff'}}
            placeholder="Accord nickname"
            placeholderTextColor="#808080"
            onChangeText={(text) => this.setState({nickname: text})}
          />
          <TextInput
            style={{height: 40, textAlign: "center", color: '#fff'}}
            placeholder="Enter Password"
            placeholderTextColor="#808080"
            secureTextEntry={true}
            onChangeText={(text) => this.setState({password: text})}
          />
          <TextInput
            style={{height: 40, textAlign: "center", color: '#fff'}}
            placeholder="Enter Your School"
            placeholderTextColor="#808080"
            onChangeText={(text) => this.setState({school: text})}
          />
          <TextInput
            style={{height: 40, textAlign: "center", color: '#fff'}}
            placeholder="Gender"
            placeholderTextColor="#808080"
            onChangeText={(text) => this.setState({gender: text})}
          />
          <TextInput
            style={{height: 40, textAlign: "center", color: '#fff'}}
            placeholder="Description"
            placeholderTextColor="#808080"
            onChangeText={(text) => this.setState({desc: text})}
          />
            <Button
              buttonStyle={styles.buttonStyle}
              onPress={ () =>  this.registerSubmit()}
              title="Sign Me Up!"
            />

						<Button
              buttonStyle={styles.buttonStyle}
              onPress={ () =>  this.gobackSubmit()}
              title="Go back"
            />
					</ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
		paddingTop: 20,
  },
  textBig: {
    fontSize: 36,
    textAlign: 'center',
    margin: 10,
    color: '#fff',
    // fontFamily: 'HelveticaNeue-BoldItalic',

  },
  buttonStyle: {
    backgroundColor: '#6adaa8',
    marginTop: 15,
		borderRadius: 10,
  }
});

export default AuthScreen;
