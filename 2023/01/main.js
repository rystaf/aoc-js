main = input => {
  const numbers = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ]

  return input.split('\n').reduce((total, line) => {
    const digits = [[], []] // part1, part2
    line.split('').forEach((l, i)=>{
      if (!isNaN(l)) {
        digits.map((x, i) => digits[i].push(l))
        return
      }
      numbers.forEach((word, n) => {
        if (line.slice(i, i + word.length) == word) {
          digits[1].push((n + 1).toString())
        }
      })
    })
    return total.map((t, i)=> digits[i].length
      ? t + parseInt(digits[i][0] + digits[i][digits[i].length - 1])
      : t)
  }, [0, 0])
}
