main = input => {

  const numbers = input.split('\n').map(x => Number(x))

  const g = numbers.length > 50 ? 25 : 5

  const part1 = numbers.find((x, i, s) => i < g ? false
    : s.slice(i - g, s.length - i < g ? s.length : i)
      .every((y, iy, sy) => !sy.includes(x - y)))

  const [part2] = numbers.map((x, i, s) => s.slice(i)
    .reduce((a,b,ii) => [
      a[0] ? a[0] : a[1] + b == part1 && 
        Math.max(...numbers.slice(i, i+ii)) +
        Math.min(...numbers.slice(i, i+ii)),
      a[1] + b,
    ],[0, 0])).find(x => x[0])

  return [part1, part2]

}
