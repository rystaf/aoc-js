main = input => {

  const clamp = (num, min, max) => {
    return Math.min(Math.max(num, min),max)
  }

  const slamp = (array, start, end) => {
    const s = clamp(start,0,array.length)
    return array.slice(
      s,
      clamp(end,s,array.length)
    )
  };

  const chairs = input.split('\n').map(x => x.split(''))

  let change = 1

  const updateChairs = rows => rows.map((row, ri, r) => row.map((col, ci, c) => {
    const adjacentOccupied = [
      ...(ri ? slamp(r[ri - 1], ci - 1, ci + 2) : []), // NW N NE
      ...(ci ? [r[ri][ci - 1]] : []), // W
      ...(ci + 1 != c.length ? [r[ri][ci + 1]] : []), // E
      ...(ri + 1 != r.length ? slamp(r[ri + 1], ci - 1, ci + 2): []), // SW S SE
    ].filter(x => x == '#').length
    if (col == 'L' && !adjacentOccupied) { change = 1; return '#' }
    if (col == '#' && adjacentOccupied >= 4) { change = 1; return 'L'}
    return col
  }))

  const countOccupied = chairs => chairs.flat().filter(x => x == '#').length

  var round = updateChairs(chairs)

  while (change) {
    change = 0
    round = updateChairs(round)
  }

  const part1 = countOccupied(round)

  return [part1]
}

