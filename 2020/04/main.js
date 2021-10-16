main = input => {

  var valid = input.split('\n\n').map(p => p.replace(/\n/g,' '))
    .map(p => p.split(' ').reduce((a, b) => ({ ...a,
      [b.split(':')[0]]: b.split(':')[1]
    }), {}))
    .filter(x => ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
      .every(f => Object.keys(x).includes(f)))

  var part1 = valid.length

  String.prototype.btwn = function(min,max) { 
    return this >= min && this <= max
  }
  
  var part2 = valid
    .filter(x => [
      ({byr}) => byr.btwn(1920, 2002),
      ({iyr}) => iyr.btwn(2010, 2020),
      ({eyr}) => eyr.btwn(2020, 2030),
      ({hgt}) => /^\d+(cm|in)$/.test(hgt),
      ({hgt}) => hgt.includes('cm')
        ? hgt.replace(/\D/g, "").btwn(150, 193)
        : hgt.replace(/\D/g, "").btwn(59, 76),
      ({hcl}) => /^#[\da-f]{6}$/.test(hcl),
      ({ecl}) => /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(ecl),
      ({pid}) => /^\d{9}$/.test(pid),
    ].every(f => f(x)))
    .length

  return [part1, part2]

}
