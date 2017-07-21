import React, {Component} from 'react';
import {	StyleSheet,
	KeyboardAvoidingView,
	View,
  ListView,
	ActivityIndicator,
	TouchableOpacity,
	Image,
TextInput,
Text,} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { List, ListItem, Button } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat';

class ChatScreen extends Component {

  constructor(props){
    super(props);
		this.state = {
			messages: [],
			currentUser: this.props.navigation.state.params.userObj
		};
		console.log('CURRENT USER', this.state.currentUser)
  }



	componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    });
  }

	onSend(messages) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    return (
			<GiftedChat
				messages={this.state.messages}
				onSend={(messages) => this.onSend(messages)}
				user={{
					_id: 1,
				}}
			/>
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
    // fontFamily: 'HelveticaNeue',
  },
  buttonStyle: {
    backgroundColor: '#6adaa8',
    marginTop: 15
  }
});

export default ChatScreen;
