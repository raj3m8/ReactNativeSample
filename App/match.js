import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, ActivityIndicator, ScrollView, FlatList } from 'react-native';
import { baseStyles, numeral } from './../App.js'

function findRankColor(rank) {
  var color = 'grey'
  if (rank == 'BRONZE') {color = '#8c6545'};
  if (rank == 'SILVER') {color = '#bcc2c0'};
  if (rank == 'GOLD') {color = '#c9be5d'};
  if (rank == 'PLATINUM') {color = '#5b9997'};
  if (rank == 'DIAMOND') {color = '#c0ccec'};
  if (rank == 'MASTER') {color = '#446d59'};
  if (rank == 'CHALLENGER') {color = '#fae579'};
  return color;
}

function victoryColor(result) {
  return result == "Victory" ? '#537cf3' : '#ec5464';
}

export class MatchScreen extends Component {
  render() {
    return (
      <ImageBackground style={baseStyles.container} source={require("./../assets/images/bg.jpg")}>
        <View style={{backgroundColor: 'transparent', marginTop: 80}}>
          <TeamContainer match_data={this.props.match_data} teamIndex={0} />
          <TeamContainer match_data={this.props.match_data} teamIndex={1} />
        </View>
      </ImageBackground>
    )
  }
}

class TeamContainer extends Component {
  render() {
    const teamPadding = this.props.teamIndex == 0 ? 0 : 5;
    return (
      <View style={styles.teamContainer} >
        <TeamHeader teamData={this.props.match_data['teams'][this.props.teamIndex]} />
        <ChampionLineItem team="100" playerIndex={0+teamPadding} match_data={this.props.match_data} />
        <ChampionLineItem team="100" playerIndex={1+teamPadding} match_data={this.props.match_data} />
        <ChampionLineItem team="100" playerIndex={2+teamPadding} match_data={this.props.match_data} />
        <ChampionLineItem team="100" playerIndex={3+teamPadding} match_data={this.props.match_data} />
        <ChampionLineItem team="100" playerIndex={4+teamPadding} match_data={this.props.match_data} />
      </View>
    )
  }
}

class TeamHeader extends Component {
  render() {
    var resultText = this.props.teamData['win'] == "Win" ? "Victory" : "Defeat";
    return (
      <View style={{flexDirection: 'row', marginBottom: 4, paddingBottom: 4, borderBottomColor: 'rgba(200, 200, 200, 0.7)', borderBottomWidth: 1}}>
        <Text style={{fontWeight: '700', fontSize: 18, marginLeft: 4, color: victoryColor(resultText)}}>{resultText}</Text>
        <Text style={{fontWeight: '700', fontSize: 18, marginLeft: 6}}>{this.props.teamData['kills']} / {this.props.teamData['deaths']} / {this.props.teamData['assists']}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', flex: 1}}>
          <Text>{this.props.teamData['towerKills']}</Text>
          <Image source={require("./../assets/images/tower.png")} style={styles.teamStatIcons}/>
          <Text>{this.props.teamData['dragonKills']}</Text>
          <Image source={require("./../assets/images/dragon.png")} style={styles.teamStatIcons}/>
          <Text>{this.props.teamData['baronKills']}</Text>
          <Image source={require("./../assets/images/baron.png")} style={styles.teamStatIcons}/>
        </View>
      </View>
    )
  }
}

class ChampionLineItem extends Component {
  render() {
    const player = this.props.match_data['participants'][this.props.playerIndex];
    const rankColor = findRankColor(player['highestAchievedSeasonTier']);
    return (
      <View style={{marginTop: 2, flexDirection: 'row'}}>
        <Image style={{width: 44, height: 44, borderWidth: 1, borderColor: "#ccc"}} source={{uri: 'https://ddragon.leagueoflegends.com/cdn/7.16.1/img/champion/'+player['champion']+'.png'}} />
        <View style={{flexDirection: 'column'}}>
          <Image source={{uri: 'https://ddragon.leagueoflegends.com/cdn/7.16.1/img/spell/'+player['summoner_spells'][0]+'.png'}} style={styles.summonerSpells} />
          <Image source={{uri: 'https://ddragon.leagueoflegends.com/cdn/7.16.1/img/spell/'+player['summoner_spells'][1]+'.png'}} style={styles.summonerSpells} />
        </View>
        <View style={{flexDirection: 'column', flex: 1}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 14, fontWeight: '700', marginTop: 2, marginLeft: 4}}>{player['stats']['kills']} / {player['stats']['deaths']} / {player['stats']['assists']}</Text>
            <View style={[styles.rankLabelContainer, {backgroundColor: rankColor}]}>
              <Text style={styles.rankLabel}>{player['highestAchievedSeasonTier']}</Text> 
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Image source={{uri: 'http://ddragon.leagueoflegends.com/cdn/7.16.1/img/item/'+player['stats']['item0']+'.png'}} style={styles.itemIcon} />
              <Image source={{uri: 'http://ddragon.leagueoflegends.com/cdn/7.16.1/img/item/'+player['stats']['item1']+'.png'}} style={styles.itemIcon} />
              <Image source={{uri: 'http://ddragon.leagueoflegends.com/cdn/7.16.1/img/item/'+player['stats']['item2']+'.png'}} style={styles.itemIcon} />
              <Image source={{uri: 'http://ddragon.leagueoflegends.com/cdn/7.16.1/img/item/'+player['stats']['item3']+'.png'}} style={styles.itemIcon} />
              <Image source={{uri: 'http://ddragon.leagueoflegends.com/cdn/7.16.1/img/item/'+player['stats']['item4']+'.png'}} style={styles.itemIcon} />
              <Image source={{uri: 'http://ddragon.leagueoflegends.com/cdn/7.16.1/img/item/'+player['stats']['item5']+'.png'}} style={styles.itemIcon} />
              <Image source={{uri: 'http://ddragon.leagueoflegends.com/cdn/7.16.1/img/item/'+player['stats']['item6']+'.png'}} style={styles.itemIcon} />
            </View>
          </View>
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1, flexDirection: 'row', marginLeft: 4}}>
              <Text style={{fontSize: 14, fontWeight: '700'}}>{player['identity']['player']['summonerName']}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginRight: 5 }}>
              <Text style={{fontSize: 14, fontWeight: '700'}}>{player['stats']['totalMinionsKilled']+player['stats']['neutralMinionsKilled']}</Text>
              <Image source={require("./../assets/images/cs.png")} style={{marginTop: 2, marginLeft: 3, marginRight: 15}}/>
              <Text style={{fontSize: 14, fontWeight: '700'}}>{numeral(player['stats']['goldEarned']).format('0,0')}</Text>
              <Image source={require("./../assets/images/coin.png")} style={{marginTop: 2, marginLeft: 3}}/>
            </View>
          </View>
        </View>
      </View> 
    )
  }
}

const styles = StyleSheet.create({
  teamContainer: {
    padding: 4,
    marginTop: 4,
    marginBottom: 4,
    backgroundColor: 'rgba(200, 200, 200, 0.5)'
  },
  summonerSpells: {
    height: 22, 
    width: 22, 
    borderWidth: 1, 
    borderColor: "#ccc"
  },
  itemIcon: {
    height: 22,
    width: 22,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#666"
  },
  rankLabel: {
    color: 'white', 
    paddingLeft: 6,
    paddingRight: 6,
    fontSize: 10,
    lineHeight: 18,
    fontWeight: '700',
    backgroundColor: 'transparent'
  },
  rankLabelContainer: {
    marginTop: 2, 
    borderRadius: 6, 
    marginLeft: 4,
  },
  teamStatIcons: {
    marginTop: 2, 
    marginLeft: 3,
    height: 12,
    width: 15,
  }
});