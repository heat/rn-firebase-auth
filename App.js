/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import RNFirebase from 'react-native-firebase';


import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

const configurationOptions = {
  debug: false,
  persistence: true,
};

const firebase = RNFirebase.initializeApp(configurationOptions);

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  render() {

    let database = firebase.database();

    let fireRef = database.ref('Noticias');
    console.log(`fora temer`);
    fireRef.on('value', (dataSnapshot) => {
      console.log(`fora temer`);
      dataSnapshot.forEach((child) => {
        console.log(child.val());
      });
    });

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
