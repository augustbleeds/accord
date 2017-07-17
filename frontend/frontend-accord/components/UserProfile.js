import React, {Component } from 'react';
import { Modal, Image, ListView, View, Text, StyleSheet, TouchableHighlight, TouchableOpacity, Alert } from 'react-native';
import { List, ListItem, Button } from 'react-native-elements'

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('HELLO THEREERERERE', this.props.signedinuserObject)
    return (
      <View style={[{flex: 1, justifyContent: 'space-between', alignItems: 'center'}, styles.profile]}>
        <Image style={{width:150 , height: 100, top: 1, alignSelf: 'auto'}} source={{uri: this.props.signedinuserObject.img}} />
        <Text style={{fontWeight: 'bold', textAlign: 'center', color: '#0000ff'}}>Signed in as: {this.props.signedIn}</Text>
        <Text style={styles.text}>Nickname: {this.props.signedinuserObject.nickname}</Text>
        <Text style={styles.text}>School: {this.props.signedinuserObject.school}</Text>
        <Text style={styles.text}>Gender: {this.props.signedinuserObject.gender}</Text>
        <Text style={styles.text}>Description: {this.props.signedinuserObject.desc}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  profile: {
    // alignSelf: 'center',
    margin: 8,
    padding: 16,
    alignItems: 'center',
    //justifyContent: 'center',
    flex: 1,
  },
  text: {
    color: 'rgba(0, 0, 0, .4)',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
