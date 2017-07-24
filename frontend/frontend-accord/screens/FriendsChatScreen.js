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

class FriendsChatScreen extends Component {

  constructor(props){
    super(props);
		this.state = {
			messages: [],
			friendUser: this.props.navigation.state.params.friendObj,
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
    console.log('HI FRIENDSCHATSCREEN')
		chatBackend.setUpFriendPending(this.state.currentUserId, this.state.matchedUserId);
		console.log('allie said this will work again!');
		console.log("OUR STATE IS: ", this.state);
		chatBackend.loadMessages( (message) => {
			this.setState((previousState) => {
				return {
					messages: GiftedChat.append(previousState.messages, message)
				}
			})}, this.state.currentUserId, this.state.matchedUserId, this.state.currentUser.nickname, this.state.friendUser.nickname);
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

  render() {
    return (
			<View style={{flex: 1}}>
        <View style={{backgroundColor: "black", flex: 1, flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => this.props.navigator.navigate('AllScrren')}
            style={{backgroundColor: "#6ADAA8", flex: 1, borderLeftWidth: 1, color: 'white', justifyContent: 'center', alignItems: 'center'}}
            >
              <Text style={{color: 'white'}}>
                Go Back
              </Text>
            </TouchableOpacity>
          </View>
				<View style={{flex: 13}}>
					<GiftedChat
						messages={this.state.messages}
						onSend={(messages) => chatBackend.sendMessage(messages, this.state.matchedUserId, this.state.currentUserId, )}
						user={{
							_id: this.state.currentUserId,
							name: this.state.currentUser.nickname,
						}}
					/>
				</View>
			</View>
    )
  }

}


export default FriendsChatScreen;
