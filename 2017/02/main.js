main = input => {
  input = input
    .replaceAll(/	/g,' ')
    .split('\n')
    .map(r => r.split(' ')
      .map(x => parseInt(x))
      .sort((a,b)=>a-b))

  var part1 = input
    .map(x => x[x.length-1] - x[0])
    .reduce((a,b)=>a+b,0)

  var part2 = input
    .map(x => x
      .map((n,i,s) => (s.slice(i+1).find(m => m % n == 0) || 0)/n)
      .find(x=>x) || 0)
    .reduce((a,b)=>a+b, 0)

  return [part1, part2]
}
