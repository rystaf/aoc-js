main = input => {

  const adapters = input.split('\n').map(x => Number(x)).sort((a,b)=>a-b)

  const part1 = [...adapters, adapters[adapters.length-1]+3]
    .reduce(([j, d1, d3], a) => [
      a,
      (a-j) == 1 ? d1 += 1 : d1,
      (a-j) == 3 ? d3 += 1 : d3
    ], [0, 0, 0])
    .reduce((a, b, i) => i ? a*b : a, 1)

  const [part2] = [0, ...adapters, adapters[adapters.length-1]+3]
    .reduce(([t,c], b, i, a) => {
      if(b-a[i-1] == 1) return [t, c += 1]
      else if (c == 2) {t *= 2; c=0}
      else if (c == 3) {t *= 4; c=0}
      else if (c == 4) {t *= 7; c=0}
      else c=0
      return [t,c]
    },[1,0])

  return [part1, part2]

}
