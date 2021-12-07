main = input => { 
  const f = n => n == 0 ? 0 : n + f(n - 1)
  const positions = input.split(',').map(x => parseInt(x))
  const max = positions.sort((a,b) => b-a)[0]

  const calculateCost = (part2=false) => {
    let position = 0
    let lowestCost = 0
    for (let i = 0; i < max+1; i += 1) {
      const cost = positions.reduce((a,b) => {
        const distance = Math.abs(i-b)
        return a + (part2 ? f(distance) : distance)
      }, 0)
      if (!lowestCost || cost < lowestCost) {
        lowestCost = cost
        position = i
      }
    }
    return lowestCost
  }
  return [calculateCost(), calculateCost(true)]
}
