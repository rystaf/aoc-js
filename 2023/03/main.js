main = input => {
  const findSymbol = (x,y,s) => {
    for(let row = -1; row < 2; row++) {
      for(let col = -1; col < 2; col++) {
        let sym;
        if (!s[y+row] || !(sym = s[y+row].split('')[x+col])) continue;
        if (sym != "." && isNaN(sym)) return x+col+(y+row)*s[0].length;
      }
    }
    return false
  }

  const gears = input.split('').filter(x => x !="\n")
    .map((x,i)=> x=="*" ? i : 0)
    .filter(x => x)
    .reduce((a,b)=>({...a, [b]: []}),{})

  const part1 = input.split('\n').reduce((total, line, y, s) => {
    let n = '';
    let symbol = false;
    line.split('').forEach((l, x) => {
      if (!isNaN(l)) {
        n += l
        symbol = symbol || findSymbol(x,y,s)
      }
      if (isNaN(l) || x == line.length - 1) {
        if (n.length && symbol) {
          total += parseInt(n)
          if (gears[symbol]) gears[symbol].push(parseInt(n))
        }
        n = '';
        symbol = false;
      }
    })
    return total
  }, 0)

  const part2 = Object.keys(gears).reduce((total, g) => total + ((gears[g].length == 2)
    ? gears[g].reduce((a,b) => a*b, 1)
    : 0), 0)

  return [part1, part2]
}
