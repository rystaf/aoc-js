main = input => {
  var findMarker = n => input
    .split('')
    .findIndex((x, i, s)=>s.slice(i, i+n).filter((x,i,s)=>s.indexOf(x)==i).length == n)+n
  var part1 = findMarker(4)
  var part2 = findMarker(14)
  return [part1, part2]
}
