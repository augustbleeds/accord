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
import { GiftedChat, Actions } from 'react-native-gifted-chat';
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
		this.renderCustomActions = this.renderCustomActions.bind(this);

  }

	// static navigationOptions = {
	// 	title: 'Home'
	// }


	onSend(messages) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

	componentDidMount(){
		chatBackend.setUpFriendPending(this.state.currentUserId, this.state.matchedUserId);
		console.log('allie said this will work again!');
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

	renderCustomActions(props) {
		return (
			<CustomActions
				{...props}
			/>
		);

	const options = {
		'Action 1': (props) => {
			alert('option 1');
		},
		'Action 2': (props) => {
			alert('option 2');
		},
		'Cancel': () => {},
	};
	return (
		<Actions
			{...props}
			options={options}
		/>
	);
}

// const navigator = StackNavigator({
// 	Chat: {screen: ChatScreen}
// })

  render() {
    return (
				<View style={{flex: 1}}>
					<View style={{flex: 1, flexDirection: 'row'}}>
					<Button title={'Leave'} buttonStyle={{flex: 1, marginTop: 20}}></Button>
					<Button title={'Connect'} buttonStyle={{flex: 1, marginTop: 20}}></Button>
				</View>
				<GiftedChat
					messages={this.state.messages}
					onSend={(messages) => chatBackend.sendMessage(messages, this.state.matchedUserId, this.state.currentUserId)}
					user={{
						_id: this.state.currentUserId,
						name: this.state.currentUser.nickname,
					}}
				/>
			</View>
    )
  }

}

// const stackNav = StackNavigator({
// 	ChatScreen: {
// 		screen: ChatScreen
// 	}
// })


export default ChatScreen;
