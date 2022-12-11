main = input => {
  var monkeys = input.split('\n\n')
    .map(x => x.split('\n'))
    .map(l => ({
      items: l[1].slice("Starting items:   ".length).split(', ').map(x => parseInt(x)),
      op: (old) => eval(l[2].slice("  Operation: new = ".length)),
      d: parseInt(l[3].slice("  Test: divisible by ".length)),
      test: (wl) => wl % parseInt(l[3].slice("  Test: divisible by ".length)) == 0
        ? parseInt(l[4].slice("    If true: throw to monkey ".length))
        : parseInt(l[5].slice("    If false: throw to monkey ".length))
    }))
  var common = monkeys.reduce((a,b)=>a*b.d,1)
  var business = (rounds, relief) => {
    let inspections = monkeys.map(x => 0)
    for (let r = 0; r < rounds; r+=1) {
      monkeys.forEach((m,i)=>{
        while(item = monkeys[i].items.shift()){
          inspections[i] += 1
          item = monkeys[i].op(item)
          if (item >= common) item = item % common
          if (relief) item = Math.floor(item/3)
          let test = monkeys[i].test(item)
          monkeys[monkeys[i].test(item)].items.push(item)
        }
      })
    }
    return inspections.sort((a,b)=>b-a).reduce((a,b,i)=>i>1?a:a*b,1)
  }
  var part1 = business(20, true)
  var part2 = business(10000, false)
  return [part1, part2]
}
