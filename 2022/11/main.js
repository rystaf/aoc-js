main = input => {
  var monkeys = input.split('\n\n')
    .map(x => x.split('\n'))
    .map(l => ({
      items: l[1].slice("Starting items:   ".length).split(', ').map(x => parseInt(x)),
      op: (old) => eval(l[2].slice("  Operation: new = ".length)),
      d: parseInt(l[3].slice("  Test: divisible by ".length)),
      t: parseInt(l[4].slice("    If true: throw to monkey ".length)),
      f: parseInt(l[5].slice("    If false: throw to monkey ".length))
    }))
  var common = monkeys.reduce((a,{d})=>a*d,1)
  var business = (rounds, relief) => {
    let inspections = monkeys.map(x => 0)
    for (let r = 0; r < rounds; r+=1) {
      monkeys.forEach((m,i)=>{
        while(item = m.items.shift()){
          inspections[i] += 1
          item = m.op(item)
          if (item >= common) item %= common
          if (relief) item = Math.floor(item/3)
          monkeys[item % m.d ? m.f : m.t].items.push(item)
        }
      })
    }
    return inspections.sort((a,b)=>b-a).reduce((a,b,i)=>i>1?a:a*b,1)
  }
  var part1 = business(20, true)
  var part2 = business(10000, false)
  return [part1, part2]
}
