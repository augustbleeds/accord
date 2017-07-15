import React, {Component} from 'react';
import {	StyleSheet,
	KeyboardAvoidingView,
	View,
	ActivityIndicator,
	TouchableOpacity,
	Image,
TextInput,
Text,} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

import { Button } from 'react-native-elements'

class AuthScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      email: ''
    }
  }
  onRegisterComplete = () => {
    this.props.navigation.navigate('Welcome');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textBig}>Let's Get Started!</Text>
          <TextInput
            style={{height: 40, paddingTop: 10, textAlign: "center", color: '#fff', fontFamily: 'HelveticaNeue',}}
            placeholder="Email Address"
            placeholderTextColor="#808080"
            onChangeText={(text) => this.setState({email: text})}
          />
          <TextInput
            style={{height: 40, paddingTop: 10, textAlign: "center", color: '#fff', fontFamily: 'HelveticaNeue',}}
            placeholder="Accord username"
            placeholderTextColor="#808080"
            onChangeText={(text) => this.setState({username: text})}
          />
          <TextInput
            style={{height: 40, paddingTop: 10, textAlign: "center", color: '#fff', fontFamily: 'HelveticaNeue',}}
            placeholder="password"
            placeholderTextColor="#808080"
            secureTextEntry={true}
            onChangeText={(text) => this.setState({password: text})}
          />
            <Button
              buttonStyle={styles.buttonStyle}
              onPress={ () =>   this.props.navigation.navigate('Login')}
              title="Sign Me Up!"
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
    backgroundColor: '#000000',
  },
  textBig: {
    fontSize: 36,
    textAlign: 'center',
    margin: 10,
    color: '#fff',
    fontFamily: 'HelveticaNeue-BoldItalic',

  },
  buttonStyle: {
    backgroundColor: '#6adaa8',
    marginTop: 15
  }
});

export default AuthScreen;
