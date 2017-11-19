/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase'

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

// Calling the following function will open the FB login dialogue:
const facebookLogin = () => {
  return LoginManager
    .logInWithReadPermissions(['public_profile', 'email'])
    .then((result) => {
      if (!result.isCancelled) {
        console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`)
        // get the access token
        return AccessToken.getCurrentAccessToken()
      }
    })
    .then(data => {
      if (data) {
        // create a new firebase credential with the token
        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken)
        // login with credential
        return firebase.auth().signInWithCredential(credential)
      }
    })
    .then((currentUser) => {
      if (currentUser) {
        console.info(JSON.stringify(currentUser.toJSON()))
      }
    })
    .catch((error) => {
      console.log(`Login fail with error: ${error}`)
    })
}

export default class App extends Component<{}> {

  _fbAuth() {
    facebookLogin();
  }
  
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
        <TouchableHighlight onPress={this._fbAuth} style={[styles.button, { marginTop: 10, height: 40, backgroundColor: '#3b5998' }]} >
          <View style={{ alignSelf: 'center', alignItems: 'center' }}>
              <Text>Login com Facebook</Text>
          </View>
        </TouchableHighlight>
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
  button: {
    height: 40,
    width: 280,
    backgroundColor: '#003566',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
