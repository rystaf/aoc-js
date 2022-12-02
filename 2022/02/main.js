main = input => { 
  var games = input.split('\n').map(x => x.split(' '))
  var rank = 'ABCAB'
  var score = (p1,p2) => {
    i = rank.indexOf(p1)
    i2 = rank.indexOf(p2) + 1
    if (p1 == p2) return 3 + i2
    if (p2 == rank[i+1]) return 6 + i2
    if (p2 == rank[i+2]) return i2
  }

  var part1 = games
    .map(g => [g[0], String.fromCharCode(g[1].charCodeAt()-23)])
    .reduce((a,b)=>score(b[0],b[1])+a,0)

  var determineHand = (p1,p2) => {
    i = rank.indexOf(p1)
    return rank[i+p2]
  }

  var part2 = games
    .map(g => [g[0], ["Y","Z","X"].indexOf(g[1])])
    .reduce((a,b)=> score(b[0],determineHand(b[0], b[1]))+a,0)

  return [part1,part2]
}
