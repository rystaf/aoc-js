main = input => {
  var rows = input.split('\n')
  var n = rows.length
  let part2 = 0
  var part1 = rows.join('').split('').map(x => parseInt(x)).filter((x,i,s) => {
    let sides = [
        s.slice(Math.floor(i/n)*n, i).reverse(), // left
        s.slice(i+1, (Math.floor(i/n)+1)*n), // right
        s.filter((x,ii)=>i%n == ii%n).slice(Math.floor(i/n)+1,n), // bottom
        s.filter((x,ii)=>i%n == ii%n).slice(0,Math.floor(i/n)).reverse() // top
    ]
    let score = sides.map(s => (s.findIndex(fx => fx >= x)+1)||s.length)
      .reduce((a,b)=>a*b,1)
    if (score > part2) part2 = score
    return sides.some(s => s.every(t => x > t))
  }).length

  return [part1, part2]
}
