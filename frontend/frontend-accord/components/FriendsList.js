import React, {Component } from 'react';
import { Platform, Modal, Image, ListView, View, Dimensions, Text, StyleSheet, TouchableHighlight, TouchableOpacity, Alert } from 'react-native';
import FriendsProfileBio from './FriendsProfileBio';
import { List, ListItem, Button } from 'react-native-elements'
const _ = require('underscore');
import firebase from 'firebase';
import { connect } from 'react-redux';
import { loadCurrentFriendInfo } from '../actions/index';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class FriendsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      data: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }),
    };
  }

  componentDidMount() {
    this._genRows();
  }

  _root: Object;

  _onPressProfile = () => {
    this.setState({visible: true});
  }

  _fetchFriendList(myUserId){
    const data = [];
    fetch('https://us-central1-accord-18bdf.cloudfunctions.net/route/user/friends/' + myUserId)
    .then((response) => response.json())
    .then((responseJson) => {
      for (var i = 0; i < responseJson.length; i++) {
        data.push(responseJson[i]);
      }
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
    var myUserId = this.props.user.email.split('.')[0];
    this._fetchFriendList(myUserId);
    var self = this;
    firebase.database().ref(`/User/${myUserId}/friends`).on('value', function(friendsSnap){
      self._fetchFriendList(myUserId);
    });
  };

  setModalVisible(visible) {
    this.setState({visible: visible});
  }

  // change the state of the current Friend
  whenAvatarClicked(nickname){
    const profile = _.findWhere(this.state.data, {nickname: nickname});
    this.props.loadFriend(profile);
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
      <View style={{width: SCREEN_WIDTH * 0.3, backgroundColor:'#FFD7A3'}}>
        <Text style={styles.textFriends}>Your Friends</Text>
        <ListView
          {...this.props}
          removeClippedSubviews={false}
          contentContainerStyle={styles.container}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          ref={el => (this._root = el)}
        />
        <Modal style={styles.modal}
          animationType={"slide"}
          transparent={false}
          visible={this.state.visible}
          onRequestClose={() => this.setState({visible: false})}
          >
            <View style={{flex: 1, backgroundColor: "#000000"}}>
              <View style={{flex: 13, justifyContent: 'space-around', alignItems: 'center', backgroundColor: "#000000"}}>
                <Text style={styles.profileText}>Profile of {this.props.currentFriend.nickname}</Text>
                <Image style={{width:200 , height: 200, borderRadius: 100}} source={{uri: this.props.currentFriend.img}} />
                <Text style={styles.text}>Nickname: {this.props.currentFriend.nickname}</Text>
                <Text style={styles.text}>School: {this.props.currentFriend.school}</Text>
                <Text style={styles.text}>Description: {this.props.currentFriend.desc}</Text>
                <Text style={styles.text}>Gender: {this.props.currentFriend.gender}</Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => {this.setModalVisible(!this.state.visible);
                    this.props.navigator.navigate('FriendsChatScreen', {
                      username1: this.props.user.email.split('.')[0],
                      username2: this.props.currentFriend.email.split('.')[0],
                      userObj: this.props.user,
                      friendObj: this.props.currentFriend,
                      navigator: this.props.navigator
                    })}}
                    style={{backgroundColor: "#6ADAA8", flex: 1, borderRightWidth: 1, color: 'white', justifyContent: 'center', alignItems: 'center'}}
                    >
                      <Text style={{color: 'white'}}>
                        Chat
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.setModalVisible(!this.state.visible)}
                      style={{backgroundColor: "red", flex: 1, borderLeftWidth: 1, color: 'white', justifyContent: 'center', alignItems: 'center'}}
                      >
                        <Text style={{color: 'white'}}>
                          Close
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </View>
            );
          }
        }

        const styles = StyleSheet.create({
          container: {
            flex: 1,
          },
          modal: {
            height: SCREEN_HEIGHT,
            width: SCREEN_WIDTH,
            alignItems: 'center',
            justifyContent: 'center',
          },

          profileText:{
            color: '#3b9788',
            fontWeight: 'bold',
            textAlign: 'center',
            paddingTop: 20,
            fontSize: 30,
            ...Platform.select({
              ios: {
                fontFamily:'Avenir'
              },
              android: {
                fontFamily: 'Roboto'
              }
            })
          },
          textFriends: {
            fontSize: 18,
            marginTop: 10,
            fontWeight:'bold',
            textAlign:'center',
            color:'black',
            ...Platform.select({
              ios: {
                fontFamily:'Avenir'
              },
              android: {
                fontFamily: 'Roboto'
              }
            })
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
            color: 'black',
            fontWeight: 'bold',
            textAlign: 'center',
            ...Platform.select({
              ios: {
                fontFamily:'Avenir'
              },
              android: {
                fontFamily: 'Roboto'
              }
            })
          },
        });

        const mapStateToProps = ({ user, currentFriend }) => {
          return { user, currentFriend };
        };

        const mapDispatchToProps = (dispatch) => {
          return {
            loadFriend: (currentFriendJson) => {
              loadCurrentFriendInfo(dispatch, currentFriendJson);
            }
          };
        }

        export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);
