import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';

class AuthScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }
  onRegisterComplete = () => {
    this.props.navigation.navigate('Welcome');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textBig}>Register</Text>
          <TextInput
            style={{height: 40, paddingTop: 10, justifyContent: "center", alignItems: "center"}}
            placeholder="Enter your username"
            onChangeText={(text) => this.setState({username: text})}
          />
          <TextInput
            style={{height: 40, paddingTop: 10, justifyContent: "center", alignItems: "center"}}
            placeholder="Enter your password"
            secureTextEntry={true}
            onChangeText={(text) => this.setState({password: text})}
          />
            <Button style={styles.buttonRed}
              onPress={ () => this.onRegisterComplete}
              title="Submit"
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
    backgroundColor: '#F5FCFF',
  },
  containerFull: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  textBig: {
    fontSize: 36,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5
  },
  buttonRed: {
    backgroundColor: '#FF585B',
  },
  buttonBlue: {
    backgroundColor: '#0074D9',
  },
  buttonGreen: {
    backgroundColor: '#2ECC40'
  },
  buttonLabel: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white'
  }
});

export default AuthScreen;
