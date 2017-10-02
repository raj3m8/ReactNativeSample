'use strict'
import React from 'react'
import { addNavigationHelpers } from 'react-navigation'
import { ItemsNavTab } from '../navigation_configuration'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'

const mapStateToProps = (state) => {
 return {
  navigationState: state.tabItems
  }
}

export class ItemsNavigation extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Items',
    tabBarIcon: ({ tintColor }) => <Icon size={ 20 } name={ 'cogs' } color={ tintColor }/>
    
  }
  render(){
    const { navigationState, dispatch } = this.props
    return (
      <ItemsNavTab
        navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: navigationState
          })
        }
      />
    )
  }
}
export default connect(mapStateToProps)(ItemsNavigation)