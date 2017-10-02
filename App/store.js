'use strict'
// Redux
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { createLogger } from 'redux-logger'
// Navigation
import { HomeNavTab } from './home/navigation_configuration'
import { ItemsNavTab } from './items/navigation_configuration'
import { TabBar } from './tab_bar/navigation_configuration'
// Middleware
const middleware = () => {
  return applyMiddleware(createLogger())
}
export default createStore(
  combineReducers({
    tabBar: (state,action) => TabBar.router.getStateForAction(action,state),
	tabHome: (state,action) => HomeNavTab.router.getStateForAction(action,state),
	tabItems: (state,action) => ItemsNavTab.router.getStateForAction(action,state),
  }),
  middleware(),
)