import React, { Component, PropTypes } from 'react';
import { addNavigationHelpers } from 'react-navigation'
import { HomeNavTab } from '../navigation_configuration'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'

const mapStateToProps = (state) => {
 return {
    navigationState: state.tabHome
  }
}

export class HomeNavigation extends Component {
  static navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ tintColor }) => <Icon size={ 20 } name={ 'cogs' } color={ tintColor }/>
    

  }
  render() {
    const { navigationState, dispatch } = this.props
    return (
      <HomeNavTab
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

export default connect(mapStateToProps)(HomeNavigation)