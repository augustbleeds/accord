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
import chatBackend from '../chatBackend.js';

class ChatScreen extends Component {

  constructor(props){
    super(props);
		this.state = {
			messages: [],
			currentUser: this.props.navigation.state.params.userObj,
			matchedUserId: this.props.navigation.state.params.username2,
			currentUserId: this.props.navigation.state.params.username1,
		};

  }

	onSend(messages) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

	componentDidMount(){
		console.log("OUR STATE IS: ", this.state);
		chatBackend.loadMessages( (message) => {
			this.setState((previousState) => {
				return {
					messages: GiftedChat.append(previousState.messages, message)
				}
			})}, this.state.currentUserId, this.state.matchedUserId, this.state.currentUser.nickname);
	}

	componentWillUnMount(){
		chatBackend.closeChat();
	}

  render() {
    return (
			<GiftedChat
				messages={this.state.messages}
				onSend={(messages) => chatBackend.sendMessage(messages, this.state.matchedUserId, this.state.currentUserId)}
				user={{
					_id: this.state.currentUserId,
					name: this.state.currentUser.nickname,
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
