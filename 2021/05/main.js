main = input => {
  const lines = input.split(/\r?\n|\r/).filter(x => x)
    .map(x => x.split(' -> ').map(p => p.split(',').map(x => parseInt(x))))

  // find largest x and y values
  const xMax = lines.flatMap(x => x[0]).sort((a,b) => b-a)[0]
  const yMax = lines.flatMap(x => x[1]).sort((a,b) => b-a)[0]
  
  const findOverlaps = (includeDiagonal = false) => {
    // create grid of zeroes
    const grid = Array.apply(null, Array(yMax+1))
      .map(()=>Array.apply(null, Array(xMax+1)).map(x => 0))

    for (const line of lines) {
      const [[x1,y1],[x2,y2]] = line
      if (includeDiagonal && x1 != x2 && y1 != y2) continue
      let [xi, yi] = [x1, y1]
      grid[y2][x2] += 1
      while (xi != x2 || yi != y2) {
        grid[yi][xi] += 1
        if (x2 > xi) xi += 1
        if (x2 < xi) xi -= 1
        if (y2 > y1) yi += 1
        if (y2 < y1) yi -= 1
      }
    }
    return grid.flatMap(x => x).filter(x => x > 1).length
  }
  return [findOverlaps(), findOverlaps(true)]
}
