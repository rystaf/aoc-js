main = input => {
  var passes = input.split('\n')
    .map(p => p.split('')
      .map(x => /[FL]/.test(x) ? '0' : '1'))
    .map(x => [ x.slice(0,7), x.slice(7) ]
      .map(n => parseInt(n.join(''), 2)))
    .map(([row, column]) => row * 8 + column)

  var part1 = Math.max(...passes)

  var part2 = passes
    .find((x,i,s) => !s.includes(x+1) && x != part1)

  return [part1, part2]
}
