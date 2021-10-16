main = input => {

  const instructions = input.split('\n')

  const compute = (inst, i=0, acc=0) => {
    if (i == inst.length) return [acc, 1]
    if (!inst[i]) return [acc, 0]
    const [op, arg] = inst[i].split(' ').map((x, i) => i ? Number(x) : x)
    inst[i] = false
    if (op == 'nop') i += 1
    if (op == 'acc') { i += 1; acc += arg }
    if (op == 'jmp') i += arg
    return compute(inst, i, acc)
  }

  const [part1] = compute([...instructions])

  const [part2] = instructions.map((x, i, s) => {
    if (!/(jmp|nop)/.test(x)) return [0, 0]
    const inst = [...s]
    inst[i] = s[i].replace(/^\S+/, /nop/.test(s[i]) ? 'jmp' : 'nop')
    return compute(inst)
  }).find(x => x[1])

  return [part1, part2]

}
