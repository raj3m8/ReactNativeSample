'use strict'
import { TabNavigator } from 'react-navigation'
import HomeNavigation from './../home/views/home_nav.js'
import ItemsNavigation from './../items/views/items_nav.js'

const routeConfiguration = {
  HomeNavigation: { screen: HomeNavigation },
  ItemNavigation: { screen: ItemsNavigation }
}

const tabBarConfiguration = {
  tabBarOptions:{
    activeTintColor: 'white',
    inactiveTintColor: 'blue',
    activeBackgroundColor: 'blue',
    inactiveBackgroundColor: 'white',
  }
}

export const TabBar = TabNavigator(routeConfiguration,tabBarConfiguration)