main = input => {
  const instructions = input.split(/\r?\n/).map(w=>w.split(','))

  const points = instructions
    .map(path => path
      .reduce((points, movement) => {
        const point = [...points[points.length-1]]
        const direction = movement[0]
        const amount = Number(movement.substr(1))
        if (direction=='R') point[0] += amount
        if (direction=='L') point[0] -= amount
        if (direction=='U') point[1] += amount
        if (direction=='D') point[1] -= amount
        return [...points, point] 
      }, [[0,0]]))

  const lineContainsPoint = (line, point) => {
    const x = [line[0][0], line[1][0]].sort((a,b)=>a-b)
    const y = [line[0][1], line[1][1]].sort((a,b)=>a-b)
    return (point[0] >= x[0])
      && (point[0] <= x[1])
      && (point[1] >= y[0])
      && (point[1] <= y[1])
  }

  const [part1] = points[0]
    .reduce((total,curr,i,s) => {
      if (i == s.length - 1) return total
      const next = s[i+1]
      const diff = [Math.sign(next[0] - curr[0]), Math.sign(next[1] - curr[1])]
      const trace = [...curr]
      const intersections = []
      while (!next.every((x,i)=>x==trace[i])) {
        if (points[1].filter((p, i, s) => {
          if (i == (s.length-1)) return
          return lineContainsPoint([p, s[i+1]],trace)
        }).length) {
          intersections.push([...trace])
        }
        trace[0] += diff[0]
        trace[1] += diff[1]
      }
      return [...total, ...intersections]
    },[])
    .map(x => x[0]+x[1])
    .filter(x => x)
    .sort((a,b)=>a-b)

  const [part2] = points[0]
    .reduce((total,curr,i,s) => {
      if (i == s.length - 1) return total
      const next = s[i+1]
      const diff = [Math.sign(next[0] - curr[0]), Math.sign(next[1] - curr[1])]
      const trace = [...curr]
      const xStepSums = []
      let traceSteps = 0
      while (!next.every((x,i)=>x==trace[i])) {
        const steps2 = points[1].reduce((a, p, i, s) => {
          if (i == (s.length-1)) return a
          return lineContainsPoint([p, s[i+1]],trace)
            ? [...a, instructions[1].slice(0,i).map(x => Number(x.substr(1)))
                .reduce((a,b)=>a + b,
                  trace.map((x,i)=>Math.abs(x-p[i])).reduce((a,b)=>a+b,0)
                )]
            : a
        }, [])
        if (steps2.length) {
          const steps1 = instructions[0].slice(0, i)
            .map(x => Number(x.substr(1)))
            .reduce((a,b)=>a+b,traceSteps) 
          xStepSums.push(...steps2.map(x => x+steps1))
        }
        trace[0] += diff[0]
        trace[1] += diff[1]
        traceSteps += 1
      }
      return [...total, ...xStepSums]
    },[])
    .filter(x => x)
    .sort((a,b)=>a-b)

  return [part1, part2]
}
