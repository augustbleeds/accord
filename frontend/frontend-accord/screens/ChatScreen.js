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

class ChatScreen extends Component {
  render() {
    console.log('THISPROPS', this.props);
    return (
      <View style={styles.container}>
        <Image style={{width:400 , heigth: 70, bottom: 65, alignSelf: 'auto'}} source={require('../assets/icons/icon2.png')} />
        <Text style={styles.textBig}>Welcome to Chat Room</Text>
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

export default ChatScreen;
