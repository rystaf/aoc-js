main = input => { 
  var inventories = input.split('\n\n').map(elf => elf.split('\n').map(x => parseInt(x)))
  var sortedTotals = inventories.map(elf => elf.reduce((a,b)=> a+b,0)).sort((a,b)=>b-a)
  var part1 = sortedTotals[0]
  var part2 = sortedTotals.slice(0,3).reduce((a,b)=>a+b,0)
  return [part1,part2]
}
