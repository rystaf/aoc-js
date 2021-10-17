main = input => {
  input = input.split(',').map(n => Number(n))

  const compute = (_input, noun, verb) => {
    const input = [..._input]
    if (noun + verb < input.length) {
      input[1] = noun
      input[2] = verb
    }
    for (let i = 0; i < input.length; i += 4) {
      const opcode = input[i];
      const inputs = [input[input[i+1]], input[input[i+2]]]
      const output = input[i+3]
      if (opcode == 1) {
        input[output] = inputs.reduce((a,b)=>a+b, 0)
      }
      if (opcode == 2) {
        input[output] = inputs.reduce((a,b)=>a*b, 1)
      }
      if (opcode == 99) {
        break;
      }
    }
    return input[0]
  }

  const part1 = compute(input, 12, 2)

  const findOutput = (input, output) => {
    for (let n = 0; n < 99; n += 1) {
      for (let v = 0; v < 99; v += 1) {
        if (compute(input, n, v) == output)
          return (100 * n + v)
      }
    }
  }

  const part2 = findOutput(input, 19690720)

  return [part1, part2]
}
