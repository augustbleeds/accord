import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, Image, Picker } from 'react-native';
import { Button } from 'react-native-elements';
import { TabNavigator, StackNavigator } from 'react-navigation';
import ModalDropdown from 'react-native-modal-dropdown';
const CATEGORY = ['Family', 'Relationship', 'School', 'Depression', 'Anxiety']


export default class MatchScreen extends Component {
  render(){
    return (
      <View style={[styles.page, styles.container]}>
        <View style={styles.container}>
          <Text style={styles.mainText}>
            MATCHING
          </Text>
          <View style={styles.container}>
      
          </View>
          <Button
            buttonStyle={styles.buttonStyle}
            raised
            title="Start Finding"
            onPress={ () => this.props.navigation.navigate('ChatScreen')}
            >
          </Button>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  dropdown_3_dropdownTextStyle: {
    backgroundColor: '#000000',
    color: '#fff'
  },
  dropdown_3_dropdownTextHighlightStyle: {
    backgroundColor: '#000000',
    color: '#fff'
  },

  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor:'#fff',
    borderRadius: 3,
  },

  mainText: {
    color: '#fff',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 10
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  swipe: {
    color: '#808080',
    textAlign: 'center',
    fontSize: 12,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  buttonStyle: {
    backgroundColor: '#6adaa8',
    marginTop: 15
  },
});
