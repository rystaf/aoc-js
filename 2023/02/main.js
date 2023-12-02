main = input => {
  return input.split('\n').reduce((total, line, i, s) => {
    //if (s.length > 10) return total
    const [gameid, games] = line.split(': ')
    const [,id] = gameid.split(' ')
    b = games.split('; ').reduce((bag, game) => {
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
    return total
  }, [0,0])
}
