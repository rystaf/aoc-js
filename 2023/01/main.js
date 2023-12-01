main = input => {
  const part1 = input.split('\n').reduce((a,b) => {
    const digits = b.split('').filter(x => !isNaN(x))
    return a + parseInt(digits[0] + digits[digits.length - 1])
  }, 0)

  const part2=0
  return [part1, part2]
}
