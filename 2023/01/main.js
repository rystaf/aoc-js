main = input => {
  const part1 = input.split('\n').reduce((a,b) => {
    const digits = b.split('').filter(x => !isNaN(x))
    if (!digits.length) {
      return a
    }
    return a + parseInt(digits[0] + digits[digits.length - 1])
  }, 0)

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

  const part2 = input.split('\n').reduce((a,b) => {
    let digits = []
    b.split('').forEach((l,i)=>{
      if (!isNaN(l)) {
        digits.push(l)
        return
      }
      numbers.forEach((w,n) => {
        if (b.substr(0,i+1).slice(w.length * -1) == w) {
          digits.push((n+1).toString())
        }
      })
    })
    return a + parseInt(digits[0] + digits[digits.length - 1])
  }, 0)

  return [part1, part2]
}
