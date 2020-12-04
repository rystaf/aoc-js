main = input => {
  var passwords = input
  .split('\n')
  .map(x => ({
    letter: x.split(' ')[1][0],
    range: x.split(' ')[0].split('-'),
    value: x.split(' ')[2]
  }))

  var part1 = passwords
    .filter(x => {
      var count = x.value.split('').reduce((a, b) => a + (b == x.letter), 0)
      return count >= x.range[0] && count <= x.range[1]
    })
    .length

  var part2 = passwords
    .filter(x => x.value[x.range[0]-1] == x.letter ^ x.value[x.range[1]-1] == x.letter)
    .length

  return [part1, part2]
}
