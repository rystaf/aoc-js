main = input => {
  return input.split('\n').reduce((total, line, i, s) => {
    const [gameid, games] = line.split(': ')
    const [,id] = gameid.split(' ')
    const b = games.split('; ').reduce((bag, game) => {
      game.split(', ').forEach(group => {
        let [n, color] = group.split(' ')
        n = parseInt(n)
        if (n > (bag[color] || 0)) {
          bag[color] = n
        }
      })
      return bag
    }, {})
    if (b.red <= 12 && b.green <= 13 && b.blue <= 14) {
      total[0] += parseInt(id)
    }
    total[1] += (b.red * b.green * b.blue)
    return total
  }, [0,0])
}
