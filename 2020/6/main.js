main = input => {

  var groups = input.split('\n\n')

  var part1 = groups
    .map(g => g.replace(/\n/g,'').split('')
      .reduce((a, b) => a.includes(b) ? a : a + b, ''))
    .map(x => x.length)
    .reduce((a, b) => a+b,0)
 
  var part2 = groups
    .map(g => g.replace(/\n/g,'').split('')
      .reduce((a, b) => a.includes(b) ? a : a + b, '')
      .split('')
      .filter(q => g.split('\n').every(x => x.includes(q)))
      .length
    ).reduce((a, b) => a+b, 0)

  return [part1, part2]

}
