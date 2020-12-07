main = input => {
  const rules = input.split('\n').map(b => ({
    container: b.split(' bags contain ')[0],
    contains: [...b.matchAll(/\d ([a-z]+ [a-z]+) bags?/g)]
      .map(x => x[1])
  }))
  const canContain = bag => rules
    .filter(x => x.contains.includes(bag))
    .map(x => [x.container, ...canContain(x.container)])
    .reduce((a, b) => Array.isArray(b) ? [...a, ...b] : [...a, b], [])
    .filter((x,i,s) => !s.slice(i+1).includes(x))

  const part1 = canContain('shiny gold').length
  return [part1]
}
