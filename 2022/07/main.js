main = input => {
  input = input.split('\n').map(x => x.split(' '))

  const hd = {
    name: "root",
    children: [{
      name: "/",
      children: []
    }]
  }

  let pwd = hd
  let ls = false
  let total = 0

  for (var i=0; i < input.length; i+=1) {
    let x = input[i]
    if(ls) {
      if (x[0] == "$") {
        i -= 1
        ls = false
        continue
      }
      else if (x[0] == "dir") {
        pwd.children.push({ parent: pwd, name: x[1], children: [] })
      }
      else {
        pwd.children.push({ name: x[1], size: parseInt(x[0]) })
      }
    }
    if(x[1] == "cd") {
      if (x[2] == "..") { 
        pwd = pwd.parent
      }
      else { pwd = pwd.children.find(y => y.name == x[2]) }
    }
    if(x[0] == "$" && x[1] == "ls") {
      ls = true
    }
  }

  var setSize = dir => {
    let size = dir.children.reduce((a,b) => {
      if (!b.children) return a+b.size
      return a+setSize(b)
    },0)
    dir.size = size
    return size
  }
  setSize(hd)

  var part1 = dir => {
    return dir.children.reduce((a,b) => {
      if (!b.children) return a
      if (b.size <= 100000) return a+b.size+part1(b)
      return a+part1(b)
    },0)
  }

  let part2 = 99999999999
  var findPart2 = dir => {
    if (dir.size >= (30000000-(70000000-hd.size)) && dir.size < part2) part2 = dir.size
    dir.children.forEach(x => {
      if (x.children) findPart2(x)
    })
  }
  findPart2(hd)

  return [part1(hd), part2]
}
