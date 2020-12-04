main = input => {
  input = input.split('\n\n').map(x => x.replace(/\n/g,' '))
  var part1 = input
    .map(x => x.split(' ').map(f => f.split(':')[0]))
    .filter(x => [
      'byr',
      'iyr',
      'eyr',
      'hgt',
      'hcl',
      'ecl',
      'pid',
    ].every(f => x.includes(f)))
    .length
  return [part1]
}
