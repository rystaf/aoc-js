main = input => {
  input = input.split('\n').map(x => x.split(' '))

  const hd = {
    children: [{
      name: "/",
      children: []
    }]
  }

  let pwd = hd

  input.forEach(x => {
    if(x[0] != "$") {
      pwd.children.push({
        name: x[1], 
        ...(x[0] == "dir")
          ? { parent: pwd, children: [] }
          : { size: parseInt(x[0]) }
      })
    } else if(x[1] == "cd") {
      pwd = (x[2] == "..") ? pwd.parent : pwd.children.find(y => y.name == x[2])
    }
  })

  var setSize = dir => dir.size = dir.children
    .reduce((a,b) => a + (b.children ? setSize(b) : b.size),0)

  setSize(hd)

  var sumDirs = dir => dir.children
    .reduce((a,b) => a + (b.children ? (sumDirs(b) + (b.size <= 100000 ? b.size : 0)) : 0), 0)

  var part1 = sumDirs(hd)

  let part2
  var findPart2 = dir => {
    part2 = (dir.size >= (30000000-(70000000-hd.size)) && (!part2 || dir.size < part2))
      ? dir.size : part2
    dir.children.filter(x => x.children).forEach(findPart2)
  }
  findPart2(hd)

  return [part1, part2]
}
