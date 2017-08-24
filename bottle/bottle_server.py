import bottle
import requests
import json
from bottle import route, hook, run, template, response, get
from constants import champion_map, summoner_spells_map

api_key = "RGAPI-e736b86e-d13a-49df-89b2-96cc32bf096d"

class EnableCors(object):
  def apply(self, fn, context):
      def _enable_cors(*args, **kwargs):
          # set CORS headers
          response.headers['Access-Control-Allow-Origin'] = '*'
          response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
          response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

          if bottle.request.method != 'OPTIONS':
              # actual request; reply with the actual response
              return fn(*args, **kwargs)

      return _enable_cors

app = bottle.app()


@route('/api/items')
def index():
  data = requests.get("https://na1.api.riotgames.com/lol/static-data/v3/items?itemListData=all&api_key="+api_key)
  return {'data': json.loads(data.text)}

@route('/api/summoner/<summoner>')
def index(summoner):
  summoner_data = requests.get("https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/"+summoner+"?itemListData=all&api_key="+api_key)
  summoner_data = json.loads(summoner_data.text)
  match_list_data = requests.get("https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/"+str(summoner_data['accountId'])+"/recent?itemListData=all&api_key="+api_key)
  match_list_data = json.loads(match_list_data.text)['matches']
  summoner_ranks = summonerRanks(str(summoner_data['id']),summoner)
  champ_masteries = championMastery(str(summoner_data['id']))
  champ_masteries = [dict(item, **{'champion': getChampionNameById(item['championId'])}) for item in champ_masteries][:5]
  match_data = []

  for item in match_list_data[:2]:
    match = requests.get("https://na1.api.riotgames.com/lol/match/v3/matches/"+str(item['gameId'])+"?forAccountId="+str(summoner_data['accountId'])+"&api_key="+api_key)
    match = json.loads(match.text)

    print "https://na1.api.riotgames.com/lol/match/v3/matches/"+str(item['gameId'])+"?forAccountId="+str(summoner_data['accountId'])+"&api_key="+api_key

    participantId = getParticipantId(match)
    participant = next((x for x in match['participants'] if x['participantId'] == participantId), None)
    teamId = participant['teamId']
    championId = participant['championId']

    match['kda'] = {'kills': participant['stats']['kills'], 'deaths': participant['stats']['deaths'], 'assists': participant['stats']['assists']}
    match['champion'] = getChampionNameById(championId)
    match['win'] = next((x for x in match['teams'] if x['teamId'] == teamId), None)['win']
    match['stats'] = next((x for x in match['participants'] if x['participantId'] == participantId), None)['stats']
    match['summoner_spells'] = findSummonerSpells(participant)

    for item in match['participants']:
      item.update( {"champion": getChampionNameById(item['championId'])})

    for team in match['teams']:
      team['kills'] = team['deaths'] = team['assists'] = 0
      for p in match['participants']:
        p['summoner_spells'] = findSummonerSpells(p)
        p['identity'] = next((x for x in match['participantIdentities'] if x['participantId'] == p['participantId']), None)
        if 'player' not in p['identity']: p['identity'] = {'player': {}} 
        if p['teamId'] == team['teamId']:
          team['kills'] += p['stats']['kills']
          team['deaths'] += p['stats']['deaths']
          team['assists'] += p['stats']['assists']

    match_data.append(match)

  return {
    'match_data': match_data, 
    'summoner_ranks': summoner_ranks, 
    'champ_masteries': champ_masteries
  } 

def getParticipantId(match):
  return next((x for x in match['participantIdentities'] if 'player' in x), None)['participantId']

def getChampionNameById(championId):
  for key,val in champion_map.items():
    if val['id'] == championId:
      champion = val['key']
      break
  return champion

def summonerRanks(summonerId,summonerName):
  summoner_rank_data = requests.get("https://na1.api.riotgames.com/lol/league/v3/positions/by-summoner/"+summonerId+"?api_key="+api_key)
  return json.loads(summoner_rank_data.text)

def championMastery(summonerId):
  champ_mast_data = requests.get("https://na1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/"+summonerId+"?api_key="+api_key)
  return json.loads(champ_mast_data.text)

def findSummonerSpells(participant):
  summoner_spells = []
  summoner_spells.append(next((x for x in summoner_spells_map if x['id'] == participant['spell1Id']), None)['key'])
  summoner_spells.append(next((x for x in summoner_spells_map if x['id'] == participant['spell2Id']), None)['key'])
  return summoner_spells

app.install(EnableCors())
app.run(port=8080)


