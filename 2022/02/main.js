main = input => { 
  var games = input.split('\n').map(x => x.split(' '))
  var code = {
    A: 'r',
    X: 'r',
    B: 'p',
    Y: 'p',
    C: 's',
    Z: 's'
  }
  var rank = 'rpsrp'
  var score = (p1,p2) => {
    i = rank.indexOf(p1)
    i2 = rank.indexOf(p2) + 1
    if (p1 == p2) return 3 + i2
    if (p2 == rank[i+1]) return 6 + i2
    if (p2 == rank[i+2]) return i2
  }

  var part1 = games
    .map(g => g.map(h=>code[h]))
    .reduce((a,b)=>score(b[0],b[1])+a,0)

  var code2 = {
    A: 'r',
    X: 2,
    B: 'p',
    Y: 0,
    C: 's',
    Z: 1
  }
  var determineHand = (p1,p2) => {
    i = rank.indexOf(p1)
    return rank[i+p2]
  }
  var part2 = games
    .map(g => g.map(h=>code2[h]))
    .reduce((a,b)=> score(b[0],determineHand(b[0], b[1]))+a,0)
  return [part1,part2]
}
