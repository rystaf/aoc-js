// 2020 day 1
main = input => {
  var entries = input.split('\n').map(x => Number(x))

  var p1 = entries
    .filter((x, i, s) => s.find(sx => ((2020 - sx) == x)))
    .reduce((a, b) => a * b, 1)

  var p2 = entries
    .filter((n1, i, s) => s.find(n2 => s.find(n3 => ((2020 - n3 - n2) == n1))))
    .reduce((a, b) => a * b, 1)

  return [p1, p2]
}
