main = input => {
  const [numbers] = input // Using array destructuring to only grab first element
    .split(/\r?\n/) // Split on line break
    .map(line => line
      .split(',')
      .map(n => parseInt(n)))

  const [,...boards] = input // Array destructuring to grab everything except first element
    .split(/\r?\n\r?\n/) // Split on blank lines (double linebreak)
    .map(board => board
      .split(/\r?\n|\r/) // Split on line breaks
      .map(row => row
        .split(' ')
        .filter(n => n) // Remove blank items due to double spacing
        .map(n => parseInt(n)))
      .filter(row => row.length) // Remove empty rows due to trailing breaks
      .flatMap(x => x)
    )

  const part1 = () => {
    const matches = boards.map(() => Array.apply(null, Array(10))
      .map(()=>Array.apply(null, Array(5))))
    let bingo
    for (const [ni, n] of numbers.entries()) {
      for (const bi in boards) {
        const i = boards[bi].indexOf(n)
        if (i > -1) {
          matches[bi][Math.floor(i / 5)][i % 5] = n
          matches[bi][(i % 5)+5][Math.floor(i / 5)] = n
        }
        bingo = matches[bi].find(row => row.filter(m => !isNaN(m)).length == 5)
        if (bingo) {
          return n * boards[bi].filter(bn => !numbers.slice(0,ni+1).includes(bn)).reduce((a,b)=>a+b,0)
        }
      }
    }
  }
  return [part1(), 0]
}
