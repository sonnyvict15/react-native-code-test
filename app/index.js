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
  ScrollView
} from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import UsersScreen from './users';
import CreatorScreen from './creator';

const Users = createStackNavigator({
  Users: {
    screen: UsersScreen
  },
},
{
  initialRouteName: 'Users',
});

const Creator = createStackNavigator({
  Creator: {
    screen: CreatorScreen
  },
},
{
  initialRouteName: 'Creator',
});

const Drawer = createDrawerNavigator({
  Users: Users,
  Creator: Creator,
}, {
    initialRouteName: 'Users',
});
export default Drawer;