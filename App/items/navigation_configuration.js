'use strict'
import { StackNavigator } from 'react-navigation'
// Screens
import ItemsScreen from './views/items.js'

const routeConfiguration = {
  TabItemsScreen: { screen: ItemsScreen }
}
// going to disable the header for now
const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'ItemsScreen'
}
export const ItemsNavTab = StackNavigator(routeConfiguration,stackNavigatorConfiguration)