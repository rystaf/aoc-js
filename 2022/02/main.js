main = input => { 
  var code = {
    A: 'r',
    X: 'r',
    B: 'p',
    Y: 'p',
    C: 's',
    Z: 's'
  }
  var games = input.split('\n').map(x => x.split(' ').map(h=>code[h]))
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
  var part1 = games.reduce((a,b)=>score(b[0],b[1])+a,0)
  return [part1,0]
}
