main = input => { 
  let part2
  const part1 = input.split('').reduce((a,b,i)=>{
    let d = (b == "(" ? 1 : -1)
    if (!part2 && a == 0 && d < 0) part2 = i + 1
    return a + d
  }, 0)
  return [part1, part2]
}
