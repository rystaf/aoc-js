main = input => {

  const instructions = input.split('\n')
    .map(x => x.split(' ').map((y,i) => i?Number(y):y))

  const compute = (i=0, acc=0) => {
    const [op, arg] = instructions[i]
    if (!op) return acc
    instructions[i][0] = false
    if (op == 'nop') return compute(i + 1, acc)
    if (op == 'acc') return compute(i + 1, acc + arg)
    if (op == 'jmp') return compute(i + arg, acc)
  }

  const part1 = compute()

  return [part1]

}
