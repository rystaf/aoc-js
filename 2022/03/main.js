main = input => { 
  var rucksacks = input.split('\n')
    .map(x => [
      x.slice(0,x.length/2).split(''),
      x.slice(x.length/2).split('')
    ])
  var part1 = rucksacks.map(r => r[0].find(item => r[1].includes(item)))
    .map(t => t.charCodeAt())
    .map(p => p - (p > 96 ? 96 : 64-26))
    .reduce((a,b)=>a+b,0)

  return [part1,0]
}
