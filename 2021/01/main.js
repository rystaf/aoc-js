main = input => {
  const depths = input.split('\n').map(x => Number(x))
  
  let numberOfDepthIncreases = 0
  for (let i = 0; i < depths.length; i += 1) {
    if (i && depths[i] > depths [i-1]) {
      numberOfDepthIncreases += 1
    }
  }

  let numberOfDepthIncreasesIn3MeasurementWindow = 0
  for (let i = 0; i < depths.length; i += 1) {
    const window1 = depths.slice(i, i+3).reduce((a,b) => a+b,0)
    const window2 = depths.slice(i+1, i+4).reduce((a,b) => a+b,0)
    if (window2 > window1) {
      numberOfDepthIncreasesIn3MeasurementWindow += 1
    }
  }
  return [numberOfDepthIncreases, numberOfDepthIncreasesIn3MeasurementWindow]
}
