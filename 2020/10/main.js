main = input => {

  const adapters = input.split('\n').map(x => Number(x)).sort((a,b)=>a-b)

  const part1 = [...adapters, adapters[adapters.length-1]+3]
    .reduce(([j, d1, d3], a) => [
      a,
      (a-j) == 1 ? d1 += 1 : d1,
      (a-j) == 3 ? d3 += 1 : d3
    ], [0, 0, 0])
    .reduce((a, b, i) => i ? a*b : a, 1)

  const findAdapters = (a) => a
    .filter(x => (x - a[0]) > 0 && (x - a[0]) < 4 ) 
    .map(f => findAdapters(a.slice(a.indexOf(f))))
    .reduce((x, y, i) => x + y - !i, 1)

  const part2 = findAdapters([0, ...adapters, adapters[adapters.length-1]+3])

  return [part1, part2]

}
