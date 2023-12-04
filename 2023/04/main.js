main = input => {
  return input.split('\n').reduce((total, line) => {
    const [have, winning] = line.slice(line.indexOf(':')+2).split('|')
      .map(x => x.split(' ').filter(x => x.length).map(x => parseInt(x)))
    total[0] += have.filter(h => winning.includes(h)).reduce((t, n) => !t ? 1 : t * 2, 0)

    return total
  }, [0, 0])
}
