main = input => { 
  var inventories = input.split('\n\n').map(elf => elf.split('\n').map(x => parseInt(x)))

  var part1 = inventories.map(elf => elf.reduce((a,b)=> a+b,0)).sort((a,b)=>b-a)[0]

  return [part1,0]
}
