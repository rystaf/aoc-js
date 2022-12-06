main = input => {
  [start, instructions] = input.split('\n\n')
  start = start
      .split('\n')
      .map(x => x.split('')
        .map(y => y.trim())
        .filter((l,i)=>i%4==1))

  moves = instructions
    .split('\n')
    .map(m => m.replace('move ','').replace(' from ',',').replace(' to ',',').split(',').map(x=>parseInt(x)))
    .map(m => [m[0], m[1]-1, m[2]-1])

  getStacks = () => [...start]
    .reverse()
    .reduce((a,b,i)=>{
      if (!i) return b.map(x=>[])
      b.forEach((n,ni)=>a[ni].push(n))
      return a
    },[])
    .map(x => x.filter(y => y))

  var moveStacks = (f, s) => {
    let stacks = s || getStacks()
    f(stacks)
    return stacks.map(x => x.reverse()[0]).join('')
  }

  var part1 = moveStacks(stacks => moves
    .forEach(([n, from, to]) => {
      for (let i = 0; i < n; i+=1) {
        stacks[to].push(stacks[from].pop())
      }
    }))

  var part2 = moveStacks(stacks => moves
    .forEach(([n, from, to]) => {
      stacks[to].push(...stacks[from].splice(stacks[from].length-n,n))
    }))

  return [part1, part2]
}
visualize = () => {
  if (typeof m != "undefined") {
    let stacks = getStacks()
    let move = 0
    let mi = 0
    var viz = {
      view: () => {
        let [n, from, to] = moves[move] || []
        let top = []
        return [
          [...stacks].sort((a,b)=>b.length - a.length)[0] 
            .map((x,i)=> stacks.map(s => s[i]))
            .concat([stacks.map(x=>undefined)])
            .reverse()
            .concat([stacks.map((x,i)=>i+1)])
            .map((x,xi, xs) => m('div', x
              .map((y, yi) => {
                if (y && top[yi] == undefined) top[yi] = xi
                let t = top[yi]
                if ((from == yi && t != undefined && (xi-t) < (n-mi)) || 
                  (to == yi && !y && xs[xi+1][yi])) {
                  var border = {border: "1px solid"}
                } else {
                  var border = {"padding": "1px"}
                }
                return m('div', {style: {
                  display: "inline-block", 
                  width: "1.5em", height: "1em", margin: "0 .25em",
                  overflow: "hidden",
                  "text-align":"center",
                  ...border
                }}, y)
              })
            )),
          m('br'),
          m('div', move >= moves.length || `${move+1}/${moves.length}: ${instructions.split('\n')[move]}`)
        ]
      }
    }
    m.mount(document.getElementById('visual'), viz);
    var draw = () => {
      if (!moves[move]) return
      let [n, from, to] = moves[move]
      stacks[to].push(stacks[from].pop())
      m.redraw()
      if (mi < n-1) {mi += 1}
      else {
        mi = 0
        move += 1
      }
      setTimeout(()=>draw(), 500)
    }
    setTimeout(()=>draw(), 500)
  }
}
