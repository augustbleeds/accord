import React, {Component } from 'react';
import { Modal, Image, ListView, View, Dimensions, Text, StyleSheet, TouchableHighlight, TouchableOpacity, Alert } from 'react-native';
import FriendsProfileBio from './FriendsProfileBio';
import { List, ListItem, Button } from 'react-native-elements'
const _ = require('underscore');
import firebase from 'firebase';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class FriendsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      email: '',
      currentFriendProf: {},
      data: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }),
    };
  }

  componentDidMount() {
    console.log('FRIENDS LIST MOUNTED AGAIN');
  }

  componentWillMount() {
    this._genRows();
  }

  _root: Object;

  _onPressProfile = () => {
    //alert('HELLO')
    this.setState({visible: true});
  }

  _fetchFriendList(myUserId){
    const data = [];
    fetch('https://us-central1-accord-18bdf.cloudfunctions.net/route/user/friends/' + myUserId)
    .then((response) => response.json())
    .then((responseJson) => {
        console.log(responseJson);
        //alert(responseJson);
        console.log("DS" , data);
        for (var i = 0; i < responseJson.length; i++) {
          data.push(responseJson[i]);
        }
        console.log("after" , data);
        this.setState({
          data,
          dataSource: this.state.dataSource.cloneWithRows(data),
      });
   })
   .catch((err) => {
     console.log('error', err)
   });
  }

  _genRows = () => {
    console.log('FRIENDSLIST', this.props.signedIn)
    var myUserId = this.props.signedIn.split('.')[0];
    this._fetchFriendList(myUserId);
    var self = this;
    console.log(`listening forrrrr /User/${myUserId}/friends`);
   firebase.database().ref(`/User/${myUserId}/friends`).on('value', function(friendsSnap){
      console.log('child_changed in FriendsList listening for', friendsSnap.val() );
      self._fetchFriendList(myUserId);
   });
  };

  setModalVisible(visible) {
    this.setState({visible: visible});
  }

  whenAvatarClicked(nickname){
    console.log('all the data is ', this.state.data);
    const profile = _.findWhere(this.state.data, {nickname: nickname});
    console.log('profile is', profile);
    this.setState({currentFriendProf: profile});
    this._onPressProfile();
  }

  _renderRow = obj => { //render our data
    return (
      <TouchableOpacity onPress={() => this.whenAvatarClicked(obj.nickname)}>
        <View style={styles.row}>
          <Text style={styles.text}>{obj.nickname}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  scrollTo = (...args: any) => this._root.scrollTo(...args);

  render() {
    return (
      <View>
      <Text style={{color: '#fffff', alignItems: 'center'}}>Friends</Text>
      <ListView
        {...this.props}
        removeClippedSubviews={false}
        contentContainerStyle={styles.container}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        // onEndReached={this._genRows} //this will get us more data
        ref={el => (this._root = el)}
      />
        <Modal style={styles.modal}
        animationType={"slide"}
        transparent={false}
        visible={this.state.visible}
        onRequestClose={() => this.setState({visible: false})}
        >
          <View style={{flex: 1, justifyContent: 'space-between', alignItems: 'center'}}>
           <View style={{justifyContent: 'space-between'}}>
             <Text>Profile of {this.state.currentFriendProf.nickname}</Text>
             <Image style={{width:150 , height: 200, top: 65, alignSelf: 'auto'}} source={{uri: this.state.currentFriendProf.img}} />
             <Text style={styles.text}>Nickname: {this.state.currentFriendProf.nickname}</Text>
             <Text style={styles.text}>School: {this.state.currentFriendProf.school}</Text>
             <Text style={styles.text}>Description: {this.state.currentFriendProf.desc}</Text>
             <Text style={styles.text}>Gender: {this.state.currentFriendProf.gender}</Text>
             <Button
               title="Close"
               onPress={() => this.setModalVisible(!this.state.visible)}>
             </Button>
           </View>
          </View>
      </Modal>

    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  modal: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    //margin: 8,
    //padding: 16,
    //borderRadius: 4,
    //backgroundColor: '#6adaa8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    margin: 8,
    padding: 16,
    borderRadius: 4,
    backgroundColor: '#6adaa8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'rgba(0, 0, 0, .4)',
    fontWeight: 'bold',
    textAlign: 'center',

  },
});
