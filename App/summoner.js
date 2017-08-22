import React, { Component } from 'react';
import { ThemeProvider } from 'react-native-material-ui';
import { StyleSheet, View, Text, Image, ImageBackground, Alert, ActivityIndicator, ScrollView, FlatList, TouchableHighlight } from 'react-native';
import { uiTheme, championNameFormat } from './../App.js'
import { MatchScreen } from './match.js'

var numeral = require('numeral');
var moment = require('moment');

function findRankByName(ranks,name) {
  var rank = ranks.find(x => x.queueType === name)
  return rank ? rank : {'tier': 'UNRANKED', 'wins': 0, 'losses': 0};
}

export class SummonerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <ImageBackground style={[styles.container,styles.itemListContainer]} source={require("./../assets/images/bg.jpg")}>
          <ScrollView>
            <View style={{flexDirection: 'row', marginTop: -70, marginLeft: 5, marginRight: 5, paddingTop: 4, backgroundColor: 'rgba(52, 52, 52, 0.2)'}}>
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
    var rank_image = require("./../assets/images/badges/UNRANKED.png")
    if (this.props && this.props.rank) {
      if (this.props.rank['tier'].indexOf("BRONZE") !== -1) { rank_image = require("./../assets/images/badges/BRONZE.png") }
      if (this.props.rank['tier'].indexOf("SILVER") !== -1) { rank_image = require("./../assets/images/badges/SILVER.png") }
      if (this.props.rank['tier'].indexOf("GOLD") !== -1) { rank_image = require("./../assets/images/badges/GOLD.png") }
      if (this.props.rank['tier'].indexOf("PLATINUM") !== -1) { rank_image = require("./../assets/images/badges/PLATINUM.png") }
      if (this.props.rank['tier'].indexOf("DIAMOND") !== -1) { rank_image = require("./../assets/images/badges/DIAMOND.png") }
      if (this.props.rank['tier'].indexOf("MASTER") !== -1) { rank_image = require("./../assets/images/badges/MASTER.png") }
      if (this.props.rank['tier'].indexOf("CHALLENGER") !== -1) { rank_image = require("./../assets/images/badges/CHALLENGER.png") }
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

class ChampionMasteries extends Component {
  render() {
    var champ_rank_image = require("./../assets/images/champ_mastery/cm1.png")
    if (this.props.champion['championLevel'] == 1) { champ_rank_image = require("./../assets/images/champ_mastery/cm1.png") }
    if (this.props.champion['championLevel'] == 2) { champ_rank_image = require("./../assets/images/champ_mastery/cm2.png") }
    if (this.props.champion['championLevel'] == 3) { champ_rank_image = require("./../assets/images/champ_mastery/cm3.png") }
    if (this.props.champion['championLevel'] == 4) { champ_rank_image = require("./../assets/images/champ_mastery/cm4.png") }
    if (this.props.champion['championLevel'] == 5) { champ_rank_image = require("./../assets/images/champ_mastery/cm5.png") }
    if (this.props.champion['championLevel'] == 6) { champ_rank_image = require("./../assets/images/champ_mastery/cm6.png") }
    if (this.props.champion['championLevel'] == 7) { champ_rank_image = require("./../assets/images/champ_mastery/cm7.png") }

    return (
      <View style={{flexDirection: 'column', paddingTop: 8, paddingBottom: 8, flex:0.18, paddingLeft: 8, alignItems: 'center'}}>
      <Text>{championNameFormat(this.props.champion['champion'])}</Text>
        <Image style={{height: 60, width: 60, borderRadius: 30, borderWidth: 3, borderColor: '#cab546'}} source={{uri: 'https://ddragon.leagueoflegends.com/cdn/7.16.1/img/champion/'+championNameFormat(this.props.champion['champion'])+'.png'}} />
        <Image source={champ_rank_image} style={{width: 60, height: 60, marginTop: -22}}/>
        <Text style={{fontWeight: "700"}}>Level {this.props.champion['championLevel']}</Text>
        <Text style={{fontWeight: "700"}}>{numeral(this.props.champion['championPoints']).format('0,0')}</Text>
      </View>
    )
  }
}

class MatchListItems extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._onMatchClick = this._onMatchClick.bind(this);
  }

  _onMatchClick(item) {
    this.props.navigator.push({
      title: "Match",
      component: MatchScreen,
      passProps: {
      	match_data: item
      }
    });
  }

  _renderItem = ({item}) => (
    <TouchableHighlight onPress={()=>this._onMatchClick(item)}>
      <View style={[styles.itemContainer,{backgroundColor: item['win'] == 'Win' ? '#7edab5' : '#f5aab2'}]} >
        <View style={{flexDirection: 'column'}}>
          <Image source={{uri: 'https://ddragon.leagueoflegends.com/cdn/7.16.1/img/champion/'+championNameFormat(item['champion'])+'.png'}} style={{width: 70, height: 70}} />
          <Text style={itemListStyles.champLevel}>{item['stats']['champLevel']}</Text>
        </View>
        <View style={{flexDirection: 'column', alignSelf: 'stretch', flex: 1}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 0.40}}>
              <Text style={itemListStyles.kda}>{item['kda']['kills']} / {item['kda']['deaths']} / {item['kda']['assists']}</Text>
              <Text style={itemListStyles.gameMode}>{item['gameMode']}</Text>
              <Text style={itemListStyles.gameMode}>{moment("2015-01-01").startOf('day').seconds(item['gameDuration']).format('mm:ss')}</Text>
              <View style={{flexDirection: 'row'}}>
                <Image source={{uri: 'https://ddragon.leagueoflegends.com/cdn/7.16.1/img/spell/'+item['summoner_spells'][0]+'.png'}} style={{height: 22, width: 22, marginLeft: 4}}/>
                <Image source={{uri: 'https://ddragon.leagueoflegends.com/cdn/7.16.1/img/spell/'+item['summoner_spells'][1]+'.png'}} style={{height: 22, width: 22, marginLeft: 2}}/>
              </View>
            </View>
            <View style={{flexDirection: 'column', flex: 1}}>
              <View style={{justifyContent: 'flex-end', flexDirection: 'row', flex: 1}}>
                <Image source={{uri: 'http://ddragon.leagueoflegends.com/cdn/7.16.1/img/item/'+item['stats']['item0']+'.png'}} style={styles.itemIcon} />
                <Image source={{uri: 'http://ddragon.leagueoflegends.com/cdn/7.16.1/img/item/'+item['stats']['item1']+'.png'}} style={styles.itemIcon} />
                <Image source={{uri: 'http://ddragon.leagueoflegends.com/cdn/7.16.1/img/item/'+item['stats']['item2']+'.png'}} style={styles.itemIcon} />
                <Image source={{uri: 'http://ddragon.leagueoflegends.com/cdn/7.16.1/img/item/'+item['stats']['item3']+'.png'}} style={styles.itemIcon} />
                <Image source={{uri: 'http://ddragon.leagueoflegends.com/cdn/7.16.1/img/item/'+item['stats']['item4']+'.png'}} style={styles.itemIcon} />
                <Image source={{uri: 'http://ddragon.leagueoflegends.com/cdn/7.16.1/img/item/'+item['stats']['item5']+'.png'}} style={styles.itemIcon} />
                <Image source={{uri: 'http://ddragon.leagueoflegends.com/cdn/7.16.1/img/item/'+item['stats']['item6']+'.png'}} style={styles.itemIcon} />
              </View>
              <View style={{flexDirection: 'row', paddingLeft: 70, marginTop: -10}}>
                <Text style={{fontWeight: "700"}}>{item['stats']['totalMinionsKilled']+item['stats']['neutralMinionsKilled']}</Text>
                <Image source={require("./../assets/images/cs.png")} style={{marginTop: 2, marginLeft: 3}}/>
                <Text style={{marginLeft: 20, fontWeight: "700"}}>{numeral(item['stats']['goldEarned']).format('0,0')}</Text>
                <Image source={require("./../assets/images/coin.png")} style={{marginTop: 2, marginLeft: 3}}/>
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