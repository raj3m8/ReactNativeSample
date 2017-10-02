'use strict'
import React from 'react'
import { addNavigationHelpers } from 'react-navigation'
import { TabBar } from '../navigation_configuration'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
 return {
  navigationState: state.tabBar,
  }
}

export class TabBarNavigation extends React.Component {
render(){
    const { dispatch, navigationState } = this.props
    return (
      <TabBar
        navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: navigationState,
          })
        }
      />
    )
  }
}
export default connect(mapStateToProps)(TabBarNavigation)