import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { BottomNavigation, COLOR, ThemeProvider, Button } from 'react-native-material-ui';

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


export default class App extends React.Component {
  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <HomePage />
          </View>
          <View style={styles.navBar}>
            <BottomNav/>
          </View>
        </View>
      </ThemeProvider>
    );
  }
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.searchSummoners = this.searchSummoners.bind(this);
  }

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


    // fetch('http://localhost:8080/api/summoner/'+this.state.summoner_name, {
    //   method: 'GET'
    // }).then(function(response) {
    //   console.log(456)
    //   return response.json();
    // }).then(function(response) {
    //   console.log(response)
    //   parent.setState({ summoner_data: response })
    // });
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
          key="today"
          icon="home"
          label="Home"
          onPress={() => this.setState({ active: 'today' })}
        />
        <BottomNavigation.Action
          key="people"
          icon="people"
          label="Items"
          onPress={() => this.setState({ active: 'people' })}
        />
        <BottomNavigation.Action
          key="bookmark-border"
          icon="bookmark-border"
          label="Profile"
          onPress={() => this.setState({ active: 'bookmark-border' })}
        />
      </BottomNavigation>
    )
  }  
}

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
