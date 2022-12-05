main = input => {
  var [start, moves] = input.split('\n\n')
  stacks = start
    .split('\n')
    .map(x => x.split('')
      .map(y => y.trim())
      .filter((l,i)=>i%4==1))
    .reverse()
    .reduce((a,b,i)=>{
      if (!i) return b.map(x=>[])
      b.forEach((n,ni)=>a[ni].push(n))
      return a
    },[])
    .map(x => x.filter(y => y))

  moves
    .split('\n')
    .map(m => m.replace('move ','').replace(' from ',',').replace(' to ',',').split(',').map(x=>parseInt(x)))
    .map(m => [m[0], m[1]-1, m[2]-1])
    .forEach(([n, from, to]) => {
      for (let i = 0; i < n; i+=1) {
        stacks[to].push(stacks[from].pop())
      }
    })
  var part1 = stacks.map(x => x.reverse()[0]).join('')

  return [part1, '']
}
