main = input => {

  const rules = input.split('\n').map(b => ({
    container: b.split(' bags contain ')[0],
    contains: [...b.matchAll(/(\d+) ([a-z]+ [a-z]+) bags?/g)]
      .flatMap(x => [...Array(Number(x[1]))].map(n => x[2]))
  }))

  const canContain = bag => rules
    .filter(x => x.contains.includes(bag))
    .flatMap(x => [x.container, ...canContain(x.container)])
    .filter((x, i, s) => !s.slice(i + 1).includes(x))

  const part1 = canContain('shiny gold').length

  const mustContain = bag => rules
    .filter(x => x.container == bag)
    .flatMap(x => x.contains)
    .flatMap(x => [x, ...mustContain(x)])

  const part2 = mustContain('shiny gold').length

  return [part1, part2]

}
