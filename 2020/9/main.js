main = input => {
  const numbers = input.split('\n')

  const part1 = numbers.filter((x,i,s) => {
    if (i < 25) return false
    return s.slice(i-25, s.length - i < 25 ? s.length:i).every((y, iy, sy) => {
      return !sy.includes(String(x-y))
    })
  })
  return [part1]
}
