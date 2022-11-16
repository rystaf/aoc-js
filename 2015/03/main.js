main = input => { 
  const move = (crd, dir) => {
    if (dir == '^') crd[1] += 1
    if (dir == 'v') crd[1] -= 1
    if (dir == '>') crd[0] += 1
    if (dir == '<') crd[0] -= 1
  }

  let santa = [0,0]
  let houses = {}
  for (let i = 0; i < input.length; i += 1) {
    houses[santa] += 1
    move(santa, input[i])
  }
  const part1 = Object.keys(houses).length

  let santas = [[0,0], [0,0]]
  houses = {}
  for (let i = 0; i < input.length; i += 1) {
    let santa = santas[i%2]
    houses[santa] += 1
    move(santa, input[i])
  }
  const part2 = Object.keys(houses).length

  return [part1, part2] 
}
