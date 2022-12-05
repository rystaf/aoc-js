main = input => {
  var pairs = input.split('\n')
    .map(x => x.split(',')
      .map(a => a.split('-')
        .map(n => parseInt(n))))

  var part1 = pairs
    .filter(p => (
      (p[0][0] >= p[1][0] && p[0][1] <= p[1][1]) ||
      (p[1][0] >= p[0][0] && p[1][1] <= p[0][1])
    ))
    .length

  var part2 = pairs
    .filter(p => (
      (p[0][0] >= p[1][0] && p[0][0] <= p[1][1]) ||
      (p[0][1] >= p[1][0] && p[0][1] <= p[1][1]) ||
      (p[1][0] >= p[0][0] && p[1][1] <= p[0][1])
    ))
    .length

  return [part1, part2]
}
