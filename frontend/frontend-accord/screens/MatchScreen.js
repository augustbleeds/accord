import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, Image } from 'react-native';
import { Button } from 'react-native-elements'
export default function MatchScreen ({ state, style }: *) {
  return (
    <View style={[styles.page, styles.container]}>
      <View style={styles.container}>
        <Text style={styles.mainText}>
          MATCHING
        </Text>
        <Button
          buttonStyle={styles.button}
          raised
          title="You Will Only Have 2 Matches Per Day"
          >
        </Button>
        <Button
          buttonStyle={styles.buttonStyle}
          raised
          title="Start Finding"
          >
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor:'#000000',
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
