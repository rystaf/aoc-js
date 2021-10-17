main = input => {
  const [start, end] = input.split('-').map(x => Number(x))

  const validPasswordCount = rules => [...Array(end-start+1).keys()].map(x => x+start)
    .filter(n => rules.every(r => r(n.toString().split('').map(x=>Number(x)))))
    .length

  const part1 = validPasswordCount([
    chars => chars.some((x,i,s) => x==s[i+1]),
    chars => chars.every((x,i,s) => s[i+1] >= x || i==s.length-1)
  ])

  const part2 = validPasswordCount([
    chars => chars.some((x,i,s) => x==s[i+1] && x!=s[i-1] && x!=s[i+2]),
    chars => chars.every((x,i,s) => s[i+1] >= x || i==s.length-1)
  ])

  return [part1, part2]
}
