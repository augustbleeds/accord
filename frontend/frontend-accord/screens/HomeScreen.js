import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, Image } from 'react-native';

export default function HomeScreen ({ state, style }: *) {
  return (
    <View style={[styles.page, styles.container]}>
      <View style={styles.container}>
        <Image style={{width:400 , heigth: 70, bottom: 65, alignSelf: 'auto'}} source={require('../assets/icons/icon2.png')} />
        <Text style={styles.mainText}>
          WELCOME TO ACCORD
        </Text>
        <Text style={styles.text}>
          About Accord...Resources...
        </Text>
        <Text style={styles.swipe}>
          Swipe Right to Start...
        </Text>
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
    marginBottom: 10,
    fontFamily: 'HelveticaNeue-BoldItalic',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    fontFamily: 'HelveticaNeue'
  },
  swipe: {
    color: '#808080',
    textAlign: 'center',
    fontSize: 12,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
