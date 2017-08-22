import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, ActivityIndicator, ScrollView, FlatList } from 'react-native';
import { baseStyles, championNameFormat } from './../App.js'

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
    return (
      <View style={{flexDirection: 'row'}}>
        <Text>{this.props.teamData['win']}</Text>
        <Text>{this.props.teamData['kills']} / {this.props.teamData['deaths']} / {this.props.teamData['assists']}</Text>
      </View>
    )
  }
}

class ChampionLineItem extends Component {
  render() {
    return (
      <View>
        <Image source={{uri: 'https://ddragon.leagueoflegends.com/cdn/7.16.1/img/champion/'+championNameFormat(this.props.match_data['participants'][this.props.playerIndex]['champion'])+'.png'}} style={{width: 30, height: 30}} />
      </View> 
    )
  }
}

const styles = StyleSheet.create({
  teamContainer: {
    padding: 4,
    margin: 4,
    backgroundColor: 'rgba(52, 52, 52, 0.2)'
  },
});