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
      showList: false,
      users: [],
      currentPage: 1,
      animated: new Animated.Value(0.7),
      parentOpacity: new Animated.Value(1),
      animatedChild: new Animated.Value(0.7),
      childOpacity: new Animated.Value(1),
      showloading: false,
      loading: false,
      message: 'There are no more users to load',
      messageOpacity: new Animated.Value(1),
      showMessage: false,
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Users',
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
    headerStyle: {
      backgroundColor: 'white',
    },
  });

  reloadList = () => {
   this.props.navigation.navigate("Users");
  }

  animation = () => {
    const { animated, parentOpacity, childOpacity, animatedChild } = this.state;
    Animated.stagger(1000, [
      Animated.loop(
        Animated.parallel([
          Animated.timing(animated, {
            toValue: 2,
            duration: 3000,
          }),
          Animated.timing(parentOpacity, {
            toValue: 0,
            duration: 3000,
          }),
        ])
      ),

      Animated.loop(
        Animated.parallel([
          Animated.timing(animatedChild, {
            toValue: 2,
            duration: 3000,
          }),
          Animated.timing(childOpacity, {
            toValue: 0,
            duration: 3000,
          }),
        ])
      )
    ]).start();
  }

  showMessage = () => {
    const { messageOpacity } = this.state;
    

    Animated.sequence([
      Animated.delay(3000),
      Animated.timing(messageOpacity, {
        toValue: 0,
        duration: 3000,
      })
    ]).start();
    setTimeout(() => {
      this.setState({showMessage: false});
    }, 6000);
  }

  getUsers = () => {
    this.setState({showloading: true, loading: true});
    this.animation();
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (xhttp.readyState == 4) {
        this.setState({showloading: false, loading: false});
        if (xhttp.status == 200) {
          let data = JSON.parse(xhttp.responseText);
          if (data.data.length > 0) {
            for (let i = 0; i < data.data.length; i++) {
              this.setState({ users: [...this.state.users, data.data[i]], currentPage: data.page + 1 });
            }
          } else {
            this.setState({showMessage: true});
            this.showMessage();
          }
        }
      }
    }.bind(this);
    xhttp.open('GET', 'https://reqres.in/api/users?per_page=10&delay=3&page=' + this.state.currentPage);
    xhttp.send();
  }

  listEnd = () => {
    if (!this.state.loading) {
      this.getUsers();
    }
  }

  componentDidMount() {
    this.getUsers();
  }
  render() {
    const { animated, parentOpacity, animatedChild, childOpacity, messageOpacity } = this.state;
    return (
      <View style={styles.container}>
        {this.state.showMessage &&
          <View style={styles.message_container}>
            <Animated.Text style={[styles.message,{opacity: messageOpacity}]}>{this.state.message}</Animated.Text>
          </View>
        }
        {this.state.showloading &&
          <View style={styles.loading_container}>
            <View style={styles.center_circle_container}>
              <View style={styles.center_circle}> 
              </View>
            </View>
            <Animated.View style={[styles.animated_container, { transform: [{ scale: animated }], opacity: parentOpacity }]}>
              <Animated.View style={[styles.animated_container, { transform: [{ scale: animatedChild }], opacity: childOpacity }]}>
              </Animated.View>
            </Animated.View>
          </View>
        }
        <FlatList style={styles.list}
          ListFooterComponent = {() => {
            return <View style={styles.footer}></View>
          }}
          onEndReached={this.listEnd}
          onEndReachedThreshold={0.1}
          alwaysBounceVertical={true}
          data={this.state.users}
          renderItem={({ item, index }) =>
            <View style={styles.item_container}>
              <View>
                <Image style={styles.avatar} source={{ uri: item.avatar }} />
              </View>
              <View>
                <Text style={styles.name}> {item.first_name} {item.last_name} </Text>
              </View>
            </View>
          }
        />
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
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  item_container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-start',
    marginLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#a3a3a3'
  },
  list: {
    width: '100%',
    height: '100%',
    paddingBottom: 20,
  },
  name: {
    marginLeft: 20,
  },
  loading_container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animated_container: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(149, 224, 98, 0.4)',
  },
  center_circle_container: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  center_circle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: 'rgb(149, 224, 98)',
  },
  message_container: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    backgroundColor: 'rgb(149, 224, 98)',
    color: '#fff',
    paddingTop: 5,
    paddingLeft: 10,
    paddingBottom: 5,
    paddingRight: 10,
    borderRadius: 20,
    zIndex: 15,
  },
  footer: {
    height: 20,
  },
});
