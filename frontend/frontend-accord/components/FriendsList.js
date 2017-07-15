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
    // alert('hi');
    <FriendsProfileBio />

  }

  _genRows = () => {
    const data = this.state.data.slice(0);
    const itemsLength = data.length;

    if (itemsLength >= 1000) {
      return;
    }

    for (let i = 0; i < 100; i++) {
      data.push(itemsLength + i);
    }

    this.setState({
      data,
      dataSource: this.state.dataSource.cloneWithRows(data),
    });
  };

  _renderRow = index => { //render our data
    return (
      <TouchableOpacity onPress={this._onPressProfile}>
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
        onEndReached={this._genRows} //this will get us more data
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
