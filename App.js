import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, Image, AppRegistry, NavigatorIOS, FlatList, ImageBackground, Alert, TouchableHighlight, ActivityIndicator, ScrollView } from 'react-native';
import { BottomNavigation, COLOR, ThemeProvider, Button } from 'react-native-material-ui';
import { TabNavigator } from 'react-navigation';
import { setCustomText } from 'react-native-global-props';
import { Font } from 'expo';
import { applyMiddleware, combineReducers, createStore } from 'redux'
import logger from 'redux-logger'
import { Provider } from 'react-redux'

import { HomeScreen } from './App/home.js'
import { ItemsHome } from './App/items.js'

export const numeral = require('numeral');
export const moment = require('moment');

const middleware = () => {
  return applyMiddleware(logger())
}

const customTextProps = {style: {fontFamily: 'Arial'} }
setCustomText(customTextProps);
export default createStore(
  combineReducers({
    tabBar: (state,action) => TabBar.router.getStateForAction(action,state),
      tabOne: (state,action) => NavigatorHomeTab.router.getStateForAction(action,state),
      tabTwo: (state,action) => NavigatorItemTab.router.getStateForAction(action,state),
  }),
  middleware(),
)

const routeConfiguration = {
  HomeNavigation: { screen: HomeScreen },
  ItemNavigation: { screen: ItemsHome },
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

export const uiTheme = {
  palette: {
    primaryColor: COLOR.green500,
  },
  toolbar: {
    container: {
      height: 50,
    },
  },
};

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}

export class Navigator extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: HomeScreen,
          title: 'Home',
        }}
        style={{flex: 1}}
      />
    );
  }
}

export class BottomNav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._clickItems = this._clickItems.bind(this);
  }

  _clickItems() {
    this.setState({ active: 'items' });
  }

  render() {
    return (
      <BottomNavigation active={this.state.active} hidden={false}>
        <BottomNavigation.Action
          key="home"
          icon="home"
          label="Home"
          onPress={() => this.setState({ active: 'home' })}
        />
        <BottomNavigation.Action
          key="items"
          icon="pages"
          label="Items"
          onPress={this._clickItems}
        />
        <BottomNavigation.Action
          key="profile"
          icon="face"
          label="Profile"
          onPress={() => this.setState({ active: 'profile' })}
        />
      </BottomNavigation>
    )
  }  
}

export const baseStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null
  },
  itemListContainer: {
    paddingTop: 75
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100
  },
  summonerSearchField: {
    marginBottom: 8,
    width: 200
  },
  homeLogo: {
    width: 200,
    height: 120,
    resizeMode: 'contain'
  },
  champListContainer: {
    marginTop: -60,
    flex: 1
  },
  itemIcon: {
    height: 28,
    width: 28,
    borderColor: "#cc9f3f",
    borderWidth: 1,
    backgroundColor: "#666"
  },
  itemContainer: {
    flexDirection: 'row', 
    padding: 4,
    borderBottomColor: '#888',
    borderBottomWidth: 0.5,
  },
  summonerRankText: {
    fontWeight: '700', 
    backgroundColor: 'transparent', 
    fontFamily: 'Marker Felt'
  }
});

const itemListStyles = StyleSheet.create({
  kda: {
    paddingTop: 2,
    fontSize: 16,
    paddingLeft: 5,
    fontWeight: '700'
  },
  gameMode: {
    fontSize: 12, 
    fontWeight: "900", 
    color: '#777', 
    paddingLeft: 5
  },
  champLevel: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
    padding: 2, 
    color: '#ddd', 
    fontWeight: '700',
    width: 22,
    textAlign: 'center',
    marginTop: -21
  }
});