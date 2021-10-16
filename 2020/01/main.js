// 2020 day 1
main = input => {

  var entries = input.split('\n').map(x => Number(x))

  var p1 = entries
    .filter((x, i, s) => s.find(sx => ( sx + x == 2020)))
    .reduce((a, b) => a * b, 1)

  var p2 = entries
    .filter((n1, i, s) => s.find(n2 => s.find(n3 => n1 + n2 + n3 == 2020)))
    .reduce((a, b) => a * b, 1)

  return [p1, p2]

}
