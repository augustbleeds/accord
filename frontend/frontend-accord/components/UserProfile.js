import React, {Component } from 'react';
import { Modal, Image, ListView, View, Text, StyleSheet, TouchableHighlight, TouchableOpacity, Alert } from 'react-native';
import { List, ListItem, Button } from 'react-native-elements';
import { connect } from 'react-redux';

class UserProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.profile}>
        <Image style={{borderRadius: 75, width:150 , height: 150, top: 1, alignSelf: 'auto'}} source={{uri: this.props.user.img}} />
        <Text style={{fontWeight: 'bold', textAlign: 'center', color: '#6adaa8'}}>Signed in as: {this.props.user.email}</Text>
        <Text style={styles.text}>Nickname: {this.props.user.nickname}</Text>
        <Text style={styles.text}>School: {this.props.user.school}</Text>
        <Text style={styles.text}>Gender: {this.props.user.gender}</Text>
        <Text style={styles.text}>Description: {this.props.user.desc}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 2,
  },
  text: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const mapStateToProps = ({ user }) => {
	return { user };
};

export default connect(mapStateToProps, null)(UserProfile);
