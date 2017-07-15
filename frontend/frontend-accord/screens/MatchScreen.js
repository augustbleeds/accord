import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, Image, Picker } from 'react-native';
import { Button } from 'react-native-elements';
import { TabNavigator, StackNavigator } from 'react-navigation';
import ModalDropdown from 'react-native-modal-dropdown';
// const CATEGORY = ['Family', 'Relationship', 'School', 'Depression', 'Anxiety']


export default class MatchScreen extends Component {
  constructor(props){
    super(props);

    this.state = ({
      language: ''
    });

  }
  render(){
    return (
      <View style={[styles.page, styles.container]}>
        <View style={styles.container}>
          <Text style={styles.mainText}>
            MATCHING
            {this.state.language}
          </Text>
            <Picker
              selectedValue={this.state.language}
              onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
          <Button
            buttonStyle={styles.buttonStyle}
            raised
            title={this.state.language}
            onPress={ () => this.props.navigation.navigate('ChatScreen')}
            >
          </Button>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
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
