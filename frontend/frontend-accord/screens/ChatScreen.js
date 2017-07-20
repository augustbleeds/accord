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
import sendbird from 'sendbird';
import { List, ListItem, Button } from 'react-native-elements'



class ChatScreen extends Component {

  constructor(props){
    super(props);

    this.state = ({
      message: '',
      allMessages: [],
      data: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }),
    })
  }

  componentDidMount() {
    console.log('i am', this.props);
    if(!this.props.navigation){
      return;
    }
    var self = this;
    var user1 = this.props.navigation.state.params.username1;
    var user2 = this.props.navigation.state.params.username2;
    console.log('the users!', user1, user2);
    self.sb = new sendbird({appId: 'F09DF0BD-A685-400B-81EA-2B17B183C1BA'});
    console.log('first user', self.props)
    self.sb.connect(user1, function(user, error) {
      console.log('yay', user);
      self.sb.setPushTemplate(self.sb.PUSH_TEMPLATE_ALTERNATIVE, function(response, error) {
        console.log('yay2', response, error);
        self.sb.OpenChannel.getChannel('test1test2', function(channel, error){
          if(error){
            console.log(error);
            return;
          }
          self.channel = channel;
          channel.enter(function(response, error){
            if(error){
              console.log(error);
              return;
            }else{
              console.log('channel joined success');
              var ChannelHandler = new self.sb.ChannelHandler();
              ChannelHandler.onMessageReceived = function(channel, message) {
                self.setState({allMessages: this.state.messageReceived.concat({message: message, mine: false})})
              }
            }
          });
        });
      });
    });
  }


  figureOutChannel() {
    if(this.props.navigation.state.params.username1 < this.props.navigation.state.params.username2){
      return this.props.navigation.state.params.username1 + '/' + this.props.navigation.state.params.username2;
    }
    return this.props.navigation.state.params.username2 + '/' + this.props.navigation.state.params.username1;
  }

  onSubmit() {
    var self = this;
    self.channel.sendUserMessage(this.state.message, null, null, function (message, error) {
      if(error){
        console.log('failure');
      }else{
        console.log('success', message);
        self.setState({allMessages: self.state.allMessages.concat({message: message, mine: true})})
      }
    })
  }

  _genRows = () => {
    const data = this.state.data.slice(0);
    const itemsLength = data.length;

    for (var i = 0; i < this.state.allMessages.length; i++) {
      data.push(this.state.allMessages[i]);
    }

    this.setState({
      data,
      dataSource: this.state.dataSource.cloneWithRows(data),
    });

  };


  _renderRow = obj => { //render our data
    return (
        <View style={styles.row}>
          <Text style={styles.text}>{obj.message}</Text>
        </View>
    );
  };

  render() {
    console.log('THISPROPS', this.props);
    return (
      <View style={styles.container}>
        <Text style={styles.textBig}>ChatRoom</Text>
          <TextInput
            style={{height: 40, paddingTop: 10, textAlign: "center", color: '#fff',
						// fontFamily: 'HelveticaNeue',
					}}
            placeholder="Enter Message"
            placeholderTextColor="#808080"
            onChangeText={(text) => this.setState({message: text})}
          />
            <Button
              buttonStyle={styles.buttonStyle}
              onPress={ () => this.onSubmit()}
              title="Submit"
            />
          <Text>{this.state.message}</Text>

          <ListView
            {...this.props}
            removeClippedSubviews={false}
            contentContainerStyle={styles.container}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
            ref={el => (this._root = el)}
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
    // fontFamily: 'HelveticaNeue',
  },
  buttonStyle: {
    backgroundColor: '#6adaa8',
    marginTop: 15
  }
});

export default ChatScreen;
