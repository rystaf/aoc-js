main = input => {
  g = false
  const moves = input.split('\n').map(x => x.split(' ')).map(x => [x[0], parseInt(x[1])])
  const h = [0,0]
  const t = [0,0]
  let i = 0
  let s = 0
  const visits = {}
  if (g) console.log(h,t)
  while(i<moves.length){
    let [d,n] = moves[i]
    if (d == "U") {
      h[1] += 1
    }
    if (d == "D") {
      h[1] -= 1
    }
    if (d == "R") {
      h[0] += 1
    }
    if (d == "L") {
      h[0] -= 1
    }
    let x = h[0]-t[0]
    let y = h[1]-t[1]
    if (Math.abs(x) > 1) {
      t[0] += x > 0 ? 1 : -1
      t[1] = h[1]
    }
    if (Math.abs(y) > 1) {
      t[1] += y > 0 ? 1 : -1
      t[0] = h[0]
    }
    if (g) console.log(d,n,h,t)
    if (!visits[t[0]]) visits[t[0]] = {}
    visits[t[0]][t[1]] = true
    if (s == n-1) {
      i += 1
      s = 0
    } else {
      s += 1
    }
  }
  if (g) console.log(visits)
  var part1=Object.keys(visits)
    .reduce((a,x)=>a+Object.keys(visits[x]).length, 0)
  var part2=0
  return [part1, part2]
}
