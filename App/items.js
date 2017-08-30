import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, ActivityIndicator, ScrollView, FlatList } from 'react-native';
import { StackNavigator } from 'react-navigation'

const stackNavigatorConfiguration = {
  initialRouteName: 'ItemsHome'
}
const routeConfiguration = {
  HomeNavigation: { screen: HomeScreen },
  ItemNavigation: { screen: ItemsHome },
}
export const NavigatorItemsTab = StackNavigator(routeConfiguration,stackNavigatorConfiguration)

export default class ItemsHome extends Component {
  render() {
    return (
      <Text>Items123</Text>
    );
  }
}