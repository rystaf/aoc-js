main = input => {
  var part1
  for(let i = 4; i < input.length; i += 1){
    if (input.slice(i, i+4).split('').filter((x,i,s)=>s.indexOf(x) == i).length == 4) {
      part1 = i+4
      break
    }
  }
  var part2
  for(let i = 14; i < input.length; i += 1){
    if (input.slice(i, i+14).split('').filter((x,i,s)=>s.indexOf(x) == i).length == 14) {
      part2 = i+14
      break
    }
  }
  return [part1, part2]
}
