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

  return [horizontalSum * verticalSum, 0]
}
