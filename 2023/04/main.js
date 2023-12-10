main = input => {
  const copies = input.split('\n').map(x => 1)
  return input.split('\n').reduce((total, line, i) => {
    const [have, winning] = line.slice(line.indexOf(':')+2).split('|')
      .map(x => x.split(' ').filter(x => x.length).map(x => parseInt(x)))
    const winners = have.filter(h => winning.includes(h))
    copies.forEach((c, ci) => {
      if (ci <= i || ci > (i+winners.length)) return
      copies[ci] += copies[i]
    })
    total[0] += winners.reduce((t, n) => !t ? 1 : t * 2, 0);
    total[1] += copies[i]
    return total
  }, [0, 0])
}
