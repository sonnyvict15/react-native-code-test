/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  Animated,
  Button,
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      creator: "Sonny Vict Abiera Sodsod",
      email: "sonnyvict15@gmail.com",
      contactnumber: "+639159445357"
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Creator',
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
    headerStyle: {
      backgroundColor: 'white',
    },
  });

  render() {
    const { animated, parentOpacity, animatedChild, childOpacity, messageOpacity } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.creatordetails}>
            <Text>Creator: {this.state.creator}</Text>
            <Text>Email: {this.state.email}</Text>
            <Text>Mobile Number: {this.state.contactnumber}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  creatordetails: {
    marginTop: 20,
    marginLeft: 20,
  },
});
