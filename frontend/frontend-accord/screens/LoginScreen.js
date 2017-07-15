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
// import {connect} from 'react-redux';
// import addingUser from '../actions/index';
import { Button } from 'react-native-elements'

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

  loginSubmit() {
    if (this.state.email) {
      fetch('https://us-central1-accord-18bdf.cloudfunctions.net/route/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson !== null) {
          //this.props.addUser(this.props.email);
          this.props.navigation.navigate('AllScreen', {user: this.state.email})
          console.log(responseJson);
        }
      })
      .catch((err) => {
        console.log('error', err)
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={{width:400 , heigth: 70, bottom: 65, alignSelf: 'auto'}} source={require('../assets/icons/icon2.png')} />
        <Text style={styles.textBig}>Login</Text>
          <TextInput
            style={{height: 40, paddingTop: 10, textAlign: "center", color: '#fff', fontFamily: 'HelveticaNeue',}}
            placeholder="Enter Email"
            placeholderTextColor="#808080"
            onChangeText={(text) => this.setState({email: text})}
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
              onPress={ () => this.loginSubmit()}
              title="Log In"
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
    fontFamily: 'HelveticaNeue',

  },
  buttonStyle: {
    backgroundColor: '#6adaa8',
    marginTop: 15
  }
});

// const mapStateToProps = (state) => {
//   return {
//     email: state.user_reducer
//   }
// };
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     addUser: (email) => dispatch(addUser(email))
//   }
// };

export default LoginScreen;
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(LoginScreen);
