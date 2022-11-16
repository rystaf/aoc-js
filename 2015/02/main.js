main = input => { 
  input = input.split('\n')
    .map(x => x.split('x').map(x=>parseInt(x)))

  const part1 = input.map(([l, w, h])=>{
      let smallestSide = [l,w,h].sort((a,b)=>a-b).slice(0,2)
      return (2*l*w + 2*w*h + 2*h*l) + smallestSide.reduce((a,b)=>a*b,1)
    })
    .reduce((a,b)=>a+b,0)

  const part2 = input
    .map(([l, w, h])=>[l, w, h]
      .sort((a,b)=>a-b)
      .slice(0,2)
      .reduce((a,b)=>a+2*b,0) + l*w*h)
    .reduce((a,b)=>a+b,0)

  return [part1, part2]
}
