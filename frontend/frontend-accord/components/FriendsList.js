import React, {Component } from 'react';
import { ListView, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import FriendsProfileBio from './FriendsProfileBio';
import { List, ListItem } from 'react-native-elements'

export default class FriendsList extends Component {
  state = {
    data: [],
    dataSource: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }),
  };

  componentWillMount() {
    this._genRows();
  }

  _root: Object;

  _onPressProfile = () => {
    alert('HELLO')
    return(

      <Text>
        HIHIHIHI
      </Text>
    )
  }
  _genRows = () => {
    const data = this.state.data.slice(0);
    fetch('https://us-central1-accord-18bdf.cloudfunctions.net/route/user/friends/test@test')
    .then((response) => response.json())
    .then((responseJson) => {
        console.log(responseJson);
        //alert(responseJson);
        console.log("DS" , data);
        for (var i = 0; i < (Object.keys(responseJson)).length; i++) {
          data.push(Object.keys(responseJson)[i])
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


  };

  _renderRow = index => { //render our data
    return (
      <TouchableOpacity onPress={() => this._onPressProfile()}>
        <View style={styles.row}>
          <Text style={styles.text}>{index}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  scrollTo = (...args: any) => this._root.scrollTo(...args);

  render() {
    return (

      <ListView
        {...this.props}
        removeClippedSubviews={false}
        contentContainerStyle={styles.container}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        // onEndReached={this._genRows} //this will get us more data
        ref={el => (this._root = el)}
      />

    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
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
