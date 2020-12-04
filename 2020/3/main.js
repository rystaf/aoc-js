main = input => {
  var route = ([r, d]) => input.split('\n')
    .filter((x, i) => i % d == 0)
    .filter((x, i) => x[i*r % x.length] == "#")
    .length

  var part1 = route([3, 1])
  var part2 = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2]
  ].map(route).reduce((a,b) => a*b, 1)

  return [part1, part2]
}
