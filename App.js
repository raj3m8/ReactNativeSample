import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, Image, AppRegistry, NavigatorIOS, FlatList, ImageBackground, Alert, TouchableHighlight, ActivityIndicator, ScrollView } from 'react-native';
import { BottomNavigation, COLOR, ThemeProvider, Button } from 'react-native-material-ui';
import { StackNavigator } from 'react-navigation';
import { setCustomText } from 'react-native-global-props';
import { Font } from 'expo';

var numeral = require('numeral');
var moment = require('moment');

const customTextProps = {
  style: {
    fontFamily: 'Arial'
  }
}
setCustomText(customTextProps);

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

function championNameFormat(champion) {
  var formatChampName = champion.toLowerCase().replace(/'/g,"")
  return formatChampName.charAt(0).toUpperCase() + formatChampName.slice(1);
}

function findRankByName(ranks,name) {
  var rank = ranks.find(x => x.queueType === name)
  return rank ? rank : {'tier': 'UNRANKED', 'wins': 0, 'losses': 0};
}

export default class App extends Component {
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

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {animating: false};
    this.handleChange = this.handleChange.bind(this);
    this._onSearch = this._onSearch.bind(this);
  }

  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }

  _onSearch() {
    const parent = this;
    this.setState({ animating: true })
    fetch('http://localhost:8080/api/summoner/'+this.state.summoner_name, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      parent.props.navigator.push({
        title: parent.state.summoner_name,
        component: SummonerSearchResults,
        passProps: {
          match_data: responseJson.match_data, 
          summoner_ranks: responseJson.summoner_ranks,
          champ_masteries: responseJson.champ_masteries,
          navigator: parent.props.navigator
        }
      });
      this.setState({ animating: false })
    })
  }

  handleChange(e) {
    this.setState({ summoner_name: e });
  }

  render() {
    return ( 
      <ThemeProvider uiTheme={uiTheme}>
        <ImageBackground style={styles.container} source={require("./assets/images/bg.jpg")}>
          <View style={styles.contentContainer}>
            <Image source={require("./assets/images/lol_logo.png")} style={styles.homeLogo} />
            <MKTextField onChangeText={ this.handleChange } style={styles.summonerSearchField} textInputStyle={{color: '#ddd'}} placeholder="Summoner Name..." />
            <Button raised primary text="Search" onPress={this._onSearch} />
            <ActivityIndicator animating={this.state.animating} color='#555' size="large"/>
          </View>
        </ImageBackground>
      </ThemeProvider>
    )
  }
}

class ChampionMasteries extends Component {
  render() {
    var champ_rank_image = require("./assets/images/badges/UNRANKED.png")
    if (this.props.champion['championLevel'] == 1) { champ_rank_image = require("./assets/images/champ_mastery/cm1.png") }
    if (this.props.champion['championLevel'] == 2) { champ_rank_image = require("./assets/images/champ_mastery/cm2.png") }
    if (this.props.champion['championLevel'] == 3) { champ_rank_image = require("./assets/images/champ_mastery/cm3.png") }
    if (this.props.champion['championLevel'] == 4) { champ_rank_image = require("./assets/images/champ_mastery/cm4.png") }
    if (this.props.champion['championLevel'] == 5) { champ_rank_image = require("./assets/images/champ_mastery/cm5.png") }
    if (this.props.champion['championLevel'] == 6) { champ_rank_image = require("./assets/images/champ_mastery/cm6.png") }
    if (this.props.champion['championLevel'] == 7) { champ_rank_image = require("./assets/images/champ_mastery/cm7.png") }

    return (
      <View style={{flexDirection: 'column', paddingTop: 8, paddingBottom: 8, flex:0.18, paddingLeft: 8, alignItems: 'center'}}>
        <Image style={{height: 60, width: 60, borderRadius: 30, borderWidth: 3, borderColor: '#cab546'}} source={{uri: 'https://ddragon.leagueoflegends.com/cdn/7.10.1/img/champion/'+championNameFormat(this.props.champion['champion'])+'.png'}} />
        <Image source={champ_rank_image} style={{width: 60, height: 60, marginTop: -22}}/>
        <Text style={{fontWeight: "700"}}>Level {this.props.champion['championLevel']}</Text>
        <Text style={{fontWeight: "700"}}>{numeral(this.props.champion['championPoints']).format('0,0')}</Text>
      </View>
    )
  }
}

class MatchScreen extends Component {
  render() {
    return (
      <ImageBackground style={styles.container} source={require("./assets/images/bg.jpg")}>

      </ImageBackground>
    )
  }
}

class MatchListItems extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._onMatchClick = this._onMatchClick.bind(this);
  }

  _onMatchClick() {
    this.props.navigator.push({
      title: "Match",
      component: MatchScreen
    });
  }

  _renderItem = ({item}) => (
    <TouchableHighlight onPress={this._onMatchClick}>
      <View style={[styles.itemContainer,{backgroundColor: item['win'] == 'Win' ? '#7edab5' : '#f5aab2'}]} >
        <Image source={{uri: 'https://ddragon.leagueoflegends.com/cdn/7.10.1/img/champion/'+championNameFormat(item['champion'])+'.png'}} style={{width: 70, height: 70}} />
        <View style={{flexDirection: 'column', alignSelf: 'stretch', flex: 1}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 0.40}}>
              <Text style={itemListStyles.kda}>{item['kda']['kills']} / {item['kda']['deaths']} / {item['kda']['assists']}</Text>
              <Text style={itemListStyles.gameMode}>{item['gameMode']}</Text>
              <Text style={itemListStyles.gameMode}>{moment("2015-01-01").startOf('day').seconds(item['gameDuration']).format('mm:ss')}</Text>
            </View>
            <View style={{flexDirection: 'column', flex: 1}}>
              <View style={{justifyContent: 'flex-end', flexDirection: 'row', flex: 1}}  onPress={this._onMatchClick}>
                <Image source={{uri: 'http://ddragon.leagueoflegends.com/cdn/7.10.1/img/item/'+item['stats']['item0']+'.png'}} style={styles.itemIcon} />
                <Image source={{uri: 'http://ddragon.leagueoflegends.com/cdn/7.10.1/img/item/'+item['stats']['item1']+'.png'}} style={styles.itemIcon} />
                <Image source={{uri: 'http://ddragon.leagueoflegends.com/cdn/7.10.1/img/item/'+item['stats']['item2']+'.png'}} style={styles.itemIcon} />
                <Image source={{uri: 'http://ddragon.leagueoflegends.com/cdn/7.10.1/img/item/'+item['stats']['item3']+'.png'}} style={styles.itemIcon} />
                <Image source={{uri: 'http://ddragon.leagueoflegends.com/cdn/7.10.1/img/item/'+item['stats']['item4']+'.png'}} style={styles.itemIcon} />
                <Image source={{uri: 'http://ddragon.leagueoflegends.com/cdn/7.10.1/img/item/'+item['stats']['item5']+'.png'}} style={styles.itemIcon} />
                <Image source={{uri: 'http://ddragon.leagueoflegends.com/cdn/7.10.1/img/item/'+item['stats']['item6']+'.png'}} style={styles.itemIcon} />
              </View>
              <View style={{flexDirection: 'row', paddingLeft: 70, marginTop: 4}}>
                <Text style={{fontWeight: "700"}}>{item['stats']['totalMinionsKilled']+item['stats']['neutralMinionsKilled']}</Text>
                <Image source={require("./assets/images/cs.png")} style={{marginTop: 2, marginLeft: 3}}/>
                <Text style={{marginLeft: 20, fontWeight: "700"}}>{numeral(item['stats']['goldEarned']).format('0,0')}</Text>
                <Image source={require("./assets/images/coin.png")} style={{marginTop: 2, marginLeft: 3}}/>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );

  _keyExtractor = (item, index) => item['gameId'];

  render() {
    return (
      <FlatList 
        data={this.props.match_data} 
        renderItem={this._renderItem} 
        keyExtractor={this._keyExtractor}
      />
    )
  }
}

class SummonerSearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <ImageBackground style={[styles.container,styles.itemListContainer]} source={require("./assets/images/bg.jpg")}>
          <ScrollView>
            <View style={{flexDirection: 'row', marginTop: -70, marginLeft: 5, marginRight: 5, backgroundColor: 'rgba(52, 52, 52, 0.2)'}}>
              <SummonerRank rank={findRankByName(this.props.summoner_ranks, 'RANKED_SOLO_5x5')} queue='Solo/Duo' />
              <SummonerRank rank={findRankByName(this.props.summoner_ranks, 'RANKED_FLEX_SR')} queue='Flex5v5' />
              <SummonerRank rank={findRankByName(this.props.summoner_ranks, 'RANKED_FLEX_TT')} queue='Flex3v3' />
            </View>
            <View style={{flexDirection: 'row', margin: 5, marginBottom: 65, backgroundColor: 'rgba(52, 52, 52, 0.2)'}}>
              {this.props.champ_masteries.length > 0 && <ChampionMasteries champion={this.props.champ_masteries[0]} /> }
              {this.props.champ_masteries.length > 1 && <ChampionMasteries champion={this.props.champ_masteries[1]} /> }
              {this.props.champ_masteries.length > 2 && <ChampionMasteries champion={this.props.champ_masteries[2]} /> }
              {this.props.champ_masteries.length > 3 && <ChampionMasteries champion={this.props.champ_masteries[3]} /> }
              {this.props.champ_masteries.length > 4 && <ChampionMasteries champion={this.props.champ_masteries[4]} /> }
            </View>
            <View style={styles.champListContainer}>
              <MatchListItems match_data={this.props.match_data} navigator={this.props.navigator}/>
            </View>
          </ScrollView>
        </ImageBackground>
      </ThemeProvider>
    )
  }
}

class SummonerRank extends Component {
  render() {
    var rank_image = require("./assets/images/badges/UNRANKED.png")
    if (this.props && this.props.rank) {
      console.log(this.props.rank)
      if (this.props.rank['tier'].indexOf("BRONZE") !== -1) { rank_image = require("./assets/images/badges/BRONZE.png") }
      if (this.props.rank['tier'].indexOf("SILVER") !== -1) { rank_image = require("./assets/images/badges/SILVER.png") }
      if (this.props.rank['tier'].indexOf("GOLD") !== -1) { rank_image = require("./assets/images/badges/GOLD.png") }
      if (this.props.rank['tier'].indexOf("PLATINUM") !== -1) { rank_image = require("./assets/images/badges/PLATINUM.png") }
      if (this.props.rank['tier'].indexOf("DIAMOND") !== -1) { rank_image = require("./assets/images/badges/DIAMOND.png") }
      if (this.props.rank['tier'].indexOf("MASTER") !== -1) { rank_image = require("./assets/images/badges/MASTER.png") }
      if (this.props.rank['tier'].indexOf("CHALLENGER") !== -1) { rank_image = require("./assets/images/badges/CHALLENGER.png") }
    }

    return (
      <View style={{alignItems: 'center', flex:0.333333, paddingTop: 8, paddingBottom: 8}}>
        <Text style={styles.summonerRankText}>{this.props.queue}</Text>
        <Image source={rank_image} style={{width: 70, height: 63}}/>
        <Text style={styles.summonerRankText}>{this.props.rank['wins']} - {this.props.rank['losses']}</Text>
        <Text style={styles.summonerRankText}>{this.props.rank['tier']} {this.props.rank['rank']}</Text>
      </View>
    )
  }
}

class BottomNav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _clickItems() {
    this.props.navigator.push({title: "Items", component: ItemsHome})
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

const styles = StyleSheet.create({
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
    paddingTop: 4,
    fontSize: 16,
    paddingLeft: 5,
    fontWeight: '700'
  },
  gameMode: {
    fontSize: 12, 
    fontWeight: "900", 
    color: '#777', 
    paddingLeft: 5
  }
});