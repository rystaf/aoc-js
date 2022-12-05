main = input => {
  var [start, moves] = input.split('\n\n')
  moves = moves
    .split('\n')
    .map(m => m.replace('move ','').replace(' from ',',').replace(' to ',',').split(',').map(x=>parseInt(x)))
    .map(m => [m[0], m[1]-1, m[2]-1])

  var moveStacks = f => {
    let stacks = start
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
