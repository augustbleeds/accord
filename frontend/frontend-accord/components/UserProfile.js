import React, {Component } from 'react';
import { Platform, Modal, Image, ListView, View, Text, StyleSheet, TouchableHighlight, TouchableOpacity, Alert,Dimensions } from 'react-native';
import { List, ListItem, Button } from 'react-native-elements';
import { connect } from 'react-redux';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
class UserProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.profile}>
        <Image style={{borderRadius: 75, width:150 , height: 150, top: 1, alignSelf: 'center'}} source={{uri: this.props.user.img}} />
        <Text> <Text style={styles.mainText}>Signed in as: </Text> <Text style={styles.mainText2}> {this.props.user.email} </Text> </Text>
        <Text> <Text style={styles.text}>Nickname: </Text> <Text style={styles.text2}> {this.props.user.nickname} </Text> </Text>
        <Text> <Text style={styles.text}>School: </Text> <Text style={styles.text2}> {this.props.user.school} </Text> </Text>
        <Text> <Text style={styles.text}>Gender: </Text> <Text style={styles.text2}> {this.props.user.gender} </Text> </Text>
        <Text> <Text style={styles.text}>Description:</Text> <Text style={styles.text2}>{this.props.user.desc}</Text></Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    width: SCREEN_WIDTH * 0.67,
  },
  mainText:{
    fontWeight: 'bold',
    // textAlign: 'left',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    fontSize: 15,
    color: '#3b9788',
    ...Platform.select({
      ios: {
        fontFamily:'Avenir'
      },
      android: {
        fontFamily: 'Roboto'
      }
    })
  },
  mainText2:{
    fontWeight: 'bold',
    // textAlign: 'right',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    fontSize: 15,
    color: '#6adaa8',
    ...Platform.select({
      ios: {
        fontFamily:'Avenir'
      },
      android: {
        fontFamily: 'Roboto'
      }
    })
  },
  text: {
    color: '#3b9788',
    fontSize: 15,
    alignItems: 'flex-end',
    fontWeight: 'bold',
    paddingHorizontal: 10,
    // textAlign: 'left',
    ...Platform.select({
      ios: {
        fontFamily:'Avenir'
      },
      android: {
        fontFamily: 'Roboto'
      }
    })
  },
  text2: {
    color: '#6adaa8',
    fontSize: 15,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    // textAlign: 'right',
    alignItems: 'flex-end',
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

const mapStateToProps = ({ user }) => {
	return { user };
};

export default connect(mapStateToProps, null)(UserProfile);
