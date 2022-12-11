main = input => {
  var monkeys = input.split('\n\n')
    .map(x => x.split('\n'))
    .map(l => ({
      items: l[1].slice("Starting items:   ".length).split(', ').map(x => parseInt(x)),
      op: (old) => Math.floor((eval(l[2].slice("  Operation: new = ".length)))/3),
      test: (wl) => wl % l[3].slice("  Test: divisible by ".length) == 0
        ? parseInt(l[4].slice("    If true: throw to monkey ".length))
        : parseInt(l[5].slice("    If false: throw to monkey ".length))
    }))
  let inspections = []
  for (let r = 0; r < 20; r+=1) {
    monkeys.forEach((m,i)=>{
      while(item = monkeys[i].items.shift()){
        inspections[i] = inspections[i] ? (inspections[i] + 1) : 1
        item = monkeys[i].op(item)
        monkeys[monkeys[i].test(item)].items.push(item)
      }
    })
  }
  var part1 = inspections.sort((a,b)=>b-a).reduce((a,b,i)=>i>1?a:a*b,1)
  var part2=0
  return [part1, part2]
}
