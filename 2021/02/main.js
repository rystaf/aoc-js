main = input => {
  // convert input to an array of [string, int]
  const steps = input
    .split('\n')
    .map(x => x.split(' '))
    .map(x => [x[0], parseInt(x[1])])

  const horizontalSum = steps
    .filter(x => x[0] == 'forward')
    .reduce((a, x) => a + x[1], 0)

  const verticalSum = steps
    .filter(x => ['up','down'].includes(x[0]))
    .map(x => x[0] == 'up' ? x[1] * -1 : x[1])
    .reduce((a, b) => a + b, 0)

  const part1 = horizontalSum * verticalSum

  let aim = 0
  let correctedVerticalSum = 0
  for (const step of steps) {
    const [direction, distance] = step
    if (direction == 'forward') correctedVerticalSum += (distance * aim)
    else if (direction == 'up') aim -= distance
    else if (direction == 'down') aim += distance
  }
  const part2 = horizontalSum * correctedVerticalSum

  return [part1, part2]
}
