main = input => {
  const numbers = input.split('\n').map(x => x.trim())
  let gammaRate = ''
  let epsilonRate = ''
  
  // loop over the length of the first number. Assuming all numbers are the same length.
  for (const i in numbers[0]) {
    const sum1 = numbers.filter(x => x[i] === '1').length
    const sum0 = numbers.filter(x => x[i] === '0').length
    if (sum1 == sum0) continue
    gammaRate += (sum1 > sum0 ? '1' : '0')
    epsilonRate += (sum1 < sum0 ? '1' : '0')
  }

  const part1 = parseInt(gammaRate, 2) * parseInt(epsilonRate, 2)

  const findRating = (bit, options, i=0) => {
    if (options.length == 1) return parseInt(options[0], 2)
    const group = [
      options.filter(x => x[i] === '0'),
      options.filter(x => x[i] === '1')
    ]
    if (group[1].length == group[0].length) return findRating(bit, group[bit], i + 1)
    const most = (group[0].length > group[1].length ? 0 : 1)
    return findRating(bit, group[bit ? most : 1 - most], i + 1)
  }
  
  const part2 = findRating(0, numbers) * findRating(1, numbers)

  return [part1, part2]
}
