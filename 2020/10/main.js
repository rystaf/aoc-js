main = input => {
  const adapters = input.split('\n').map(x => Number(x)).sort((a,b)=>a-b)
  const part1 = [...adapters, adapters[adapters.length-1]+3]
    .reduce(([j,d1,d3],a) => [
      a,
      (a-j) == 1 ? d1 += 1 : d1,
      (a-j) == 3 ? d3 += 1 : d3
    ], [0,0,0])
    .reduce((a, b, i) => i ? a*b : a, 1)
  return [part1]
}
