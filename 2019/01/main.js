
main = input => {

  const modules = input.split('\n').map(x => Number(x))

  const calculateFuel = mass => Math.trunc(mass / 3) - 2

  const part1 = modules
    .map(calculateFuel)
    .reduce((a, b) => a + b, 0)

  const calculateTotalFuel = mass => {
    const f = calculateFuel(mass)
    if (f <= 0) return 0
    return f + calculateTotalFuel(f)
  }

  const part2 = modules
    .map(calculateTotalFuel)
    .reduce((a, b) => a + b, 0)

  return [part1, part2]

}
