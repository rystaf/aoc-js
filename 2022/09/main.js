main = input => {
  const moves = input.split('\n').map(x => x.split(' ')).map(x => [x[0], parseInt(x[1])])
  const move = knots => {
    const rope = [...Array(knots).keys()].map(x => [0,0])
    let i = 0
    let s = 0
    const visits = {}
    while(i<moves.length){
      let [d,n] = moves[i]
      if (d == "U") {
        rope[0][1] += 1
      }
      if (d == "D") {
        rope[0][1] -= 1
      }
      if (d == "R") {
        rope[0][0] += 1
      }
      if (d == "L") {
        rope[0][0] -= 1
      }
      rope.forEach((k, i) => {
        if (!i) return;
        let x = rope[i-1][0]-rope[i][0]
        let y = rope[i-1][1]-rope[i][1]
        if (Math.abs(y) > 1) {
          rope[i][1] += y > 0 ? 1 : -1
          if (Math.abs(x) <= 1) rope[i][0] = rope[i-1][0]
        }
        if (Math.abs(x) > 1) {
          rope[i][0] += x > 0 ? 1 : -1
          if (Math.abs(y) <= 1) rope[i][1] = rope[i-1][1]
        }
      })
      let t = rope[rope.length-1] 
      if (!visits[t[0]]) visits[t[0]] = {}
      visits[t[0]][t[1]] = true
      if (s == n-1) {
        i += 1
        s = 0
      } else {
        s += 1
      }
    }
    return Object.keys(visits)
      .reduce((a,x)=>a+Object.keys(visits[x]).length, 0)
  }
  var part1 = move(2)
  var part2 = move(10)
  return [part1, part2]
}
