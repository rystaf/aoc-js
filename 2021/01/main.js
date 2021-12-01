main = input => {
  const depths = input.split('\n').map(x => Number(x))
  
  let numberOfDepthIncreases = 0
  for (let i = 0; i < depths.length; i += 1) {
    if (i && depths[i] > depths [i-1]) numberOfDepthIncreases += 1
  }
  return [numberOfDepthIncreases, 0]
}
