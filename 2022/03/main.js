main = input => { 
  var rucksacks = input.split('\n')

  var part1 = rucksacks
    .map(x => [
      x.slice(0,x.length/2).split(''),
      x.slice(x.length/2).split('')
    ])
    .map(r => r[0].find(item => r[1].includes(item)))
    .map(t => t.charCodeAt())
    .map(p => p - (p > 96 ? 96 : 64-26))
    .reduce((a,b)=>a+b,0)

  var part2 = rucksacks
    .map(x => x.split(''))
    .reduce((a,b,i) => {
      n = Math.trunc(i/3)
      if (!a[n]) a[n] = []
      a[n].push(b)
      return a
    },[])
    .map(r => r[0].find(item => r[1].includes(item) && r[2].includes(item)))
    .map(t => t.charCodeAt())
    .map(p => p - (p > 96 ? 96 : 64-26))
    .reduce((a,b)=>a+b,0)

  return [part1,part2]
}
