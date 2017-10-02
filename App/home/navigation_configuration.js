'use strict'
import { StackNavigator } from 'react-navigation'
import HomeScreen from './views/home'
import SummonerScreen from './views/summoner'
import MatchScreen from './views/match'

const routeConfiguration = {
  TabHomeScreen: { screen: HomeScreen },
  TabSummonerScreen: { screen: SummonerScreen },
  TabMatchScreen: { screen: MatchScreen },
}

const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'HomeScreen'
}

export const HomeNavTab = StackNavigator(routeConfiguration,stackNavigatorConfiguration)