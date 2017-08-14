import React from 'react';
import { StyleSheet, Text, View, Image, AppRegistry } from 'react-native';
import { BottomNavigation, COLOR, ThemeProvider, Button } from 'react-native-material-ui';
import PropTypes from 'prop-types';
import { StackNavigator } from 'react-navigation';

const MK = require('react-native-material-kit');
const {
  MKTextField
} = MK;

const uiTheme = {
  palette: {
    primaryColor: COLOR.green500,
  },
  toolbar: {
    container: {
      height: 50,
    },
  },
};


// export default class App extends React.Component {
//   render() {
//     return (
//       <ThemeProvider uiTheme={uiTheme}>
//         <View style={styles.container}>
//           <View style={styles.contentContainer}>
            
//           </View>
//           <View style={styles.navBar}>
//             <BottomNav/>
//           </View>
//         </View>
//       </ThemeProvider>
//     );
//   }
// }

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.searchSummoners = this.searchSummoners.bind(this);
  }

  static navigationOptions = {
    title: 'Welcome',
  };

  searchSummoners() {
    const parent = this;
    console.log(123);
    fetch('http://localhost:8080/api/summoner/'+this.state.summoner_name, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      parent.setState({ summoner_data: responseJson.data })
    })
  }

  handleChange(e) {
    this.setState({ summoner_name: e });
  }

  render() {
    return (
      <View>
        <Image source={require("./assets/images/lol_logo.png")} style={styles.homeLogo} />
        <MKTextField onChangeText={ this.handleChange } placeholder="Summoner Name..." />
        <Button raised primary text="Search" onPress={this.searchSummoners} />
        <Text>{JSON.stringify(this.state.summoner_data)}</Text>
      </View>
    )
  }
}

class BottomNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    //this.handleChange = this.handleChange.bind(this);
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
          onPress={() => this.setState({ active: 'items' })}
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

const App = StackNavigator({
  Home: { screen: HomeScreen },
});

AppRegistry.registerComponent('SimpleApp', () => SimpleApp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
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
  }
});
