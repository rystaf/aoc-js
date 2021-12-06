main = input => {
  const fish = input.split(',').map(x => parseInt(x))
  const calculateFish = (days) => {
    const totals = Array.apply(null, Array(9))
      .map((x,i) => fish.filter(x => x==i).length)
    for (let day = 0; day < days; day += 1) {
      totals[7] += totals[0]
      totals.push(totals.shift(0))
    }
    return totals.reduce((a, b) => a+b,0)
  }
  return [calculateFish(80), calculateFish(256)]
}
