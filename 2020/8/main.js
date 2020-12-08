main = input => {
  Array.prototype.copy = function() {
    return JSON.parse(JSON.stringify(this))
  }
  const instructions = input.split('\n')
    .map(x => x.split(' ').map((y,i) => i?Number(y):y))

  const compute = (inst, i=0, acc=0) => {
    if (i == inst.length) return [acc, 1]
    const [op, arg] = inst[i]
    if (!op) return [acc, 0]
    inst[i][0] = false
    if (op == 'nop') return compute(inst, i + 1, acc)
    if (op == 'acc') return compute(inst, i + 1, acc + arg)
    if (op == 'jmp') return compute(inst, i + arg, acc)
  }

  const part1 = compute(instructions.copy())[0]

  const part2 = instructions.map((x,i,s) => {
    const inst = s.copy()
    if (x[0] == 'nop') inst[i][0] = 'jmp'
    if (x[0] == 'jmp') inst[i][0] = 'nop'
    return compute(inst)
  }).find(x => x[1])[0]

  return [part1, part2]

}
