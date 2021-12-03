main = input => {
  const numbers = input.split('\n')
  let gammaRate = ''
  let epsilonRate = ''

  // loop over the length of the first number. Assuming all numbers are the same length.
  for (const i in numbers[0]) {
    const positionNumbers = numbers.map(x => x[i])
    const numOnes = positionNumbers.filter(x => x === '1').length
    const numZeros = positionNumbers.filter(x => x === '0').length
    if (numOnes == numZeros) continue
    gammaRate += (numOnes > numZeros ? '1' : '0')
    epsilonRate += (numOnes < numZeros ? '1' : '0')
  }

  const part1 = parseInt(gammaRate, 2) * parseInt(epsilonRate, 2)

  return [part1,0]
}
