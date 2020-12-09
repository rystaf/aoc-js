main = input => {
  const numbers = input.split('\n').map(x => Number(x))

  const [part1] = numbers.filter((x,i,s) => i < 25
    ? false
    : s.slice(i-25, s.length - i < 25 ? s.length : i).every((y, iy, sy) => !sy.includes(x-y)))
  var part2 = 0
  numbers.map((x,i,s) => {
    return s.slice(i).reduce((a,b,ii) => {
      if (a+b == part1 && !part2) {
        part2 = [
          numbers.slice(i,ii+i).sort()[0],
          numbers.slice(i,ii+i).sort().reverse()[0]]
          .reduce((a,b) =>a+b,0)
      }
      return a+b
    },0)
  })
  return [part1,part2]
}
