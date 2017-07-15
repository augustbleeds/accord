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

  onMatchComplete() {
    this.props.navigation.navigate('ChatScreen');
  }
  fetchMatch() {
    console.log('asdfasdfasdf');
    console.log(this.state.language);
    console.log(this.props.signedIn);

    fetch('https://us-central1-accord-18bdf.cloudfunctions.net/route/user/match/' + this.state.language + '/' + this.props.signedIn.split('.')[0], {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)
      if(responseJson.success === true) {
        //this.props.addUser(this.props.email);
        console.log('hihihi');
        alert('You will be notified when there is a match! :)');
      }
    })
    .catch((err) => {
      console.log('error', err)
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
              <Picker.Item label="Depression" value="Depression" />
              <Picker.Item label="Anxiety" value="Anxiety" />
              <Picker.Item label="Family Issues" value="Family Issues" />
              <Picker.Item label="Relationship" value="Relationship" />
              <Picker.Item label="School" value="School" />
            </Picker>
          <Button
            buttonStyle={styles.buttonStyle}
            raised
            title='Match!'
            onPress={ () => this.fetchMatch()}
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
