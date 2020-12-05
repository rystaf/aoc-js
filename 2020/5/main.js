main = input => {
  var passes = input.split('\n')
    .map(p => p.split('')
      .map(x => ['F','L'].includes(x) ? '0' : '1'))
    .map(x => [x.slice(0,7), x.slice(7)].map(n => parseInt(n.join(''), 2)))
    .map(([row, column]) => row * 8 + column)
  var part1 = Math.max(...passes)
  return [part1]
}
