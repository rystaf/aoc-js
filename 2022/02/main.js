main = input => { 
  var code = {
    A: 'r',
    X: 'r',
    B: 'p',
    Y: 'p',
    C: 's',
    Z: 's'
  }
  var games = input.split('\n').map(x => x.split(' '))
  var score = (p1,p2) => {
    if (p1 == 'p') {
      if (p2 == 'p') return 3 + 2
      if (p2 == 's') return 6 + 3
      if (p2 == 'r') return 0 + 1
    }
    if (p1 == 'r') {
      if (p2 == 'p') return 6 + 2
      if (p2 == 's') return 0 + 3
      if (p2 == 'r') return 3 + 1
    }
    if (p1 == 's') {
      if (p2 == 'p') return 0 + 2
      if (p2 == 's') return 3 + 3
      if (p2 == 'r') return 6 + 1
    }
  }
  var part1 = games.map(g => g.map(h=>code[h])).reduce((a,b)=>score(b[0],b[1])+a,0)

  var code2 = {
    A: 'r',
    X: 0,
    B: 'p',
    Y: 3,
    C: 's',
    Z: 6
  }
  var score2 = (p1,p2) => {
    if (p1 == 'p') {
      if (p2 == 0) return p2 + 1
      if (p2 == 3) return p2 + 2
      if (p2 == 6) return p2 + 3
    }
    if (p1 == 'r') {
      if (p2 == 0) return p2 + 3
      if (p2 == 3) return p2 + 1
      if (p2 == 6) return p2 + 2
    }
    if (p1 == 's') {
      if (p2 == 0) return p2 + 2
      if (p2 == 3) return p2 + 3
      if (p2 == 6) return p2 + 1
    }
  }
  var part2 = games.map(g => g.map(h=>code2[h])).reduce((a,b)=>score2(b[0],b[1])+a,0)
  return [part1,part2]
}
