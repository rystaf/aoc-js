main = input => {
  var instructions = input.split('\n').map(x => x.split(' ').map((x, i)=> i ? parseInt(x):x))
  let i = 0
  let c = 1
  let s = 0
  let X = 1
  let sum = 0
  crt = []
  while (i < instructions.length) {
    var [m,n] = instructions[i]
    crt[c-1] = (Math.abs(X-((c-1)%40)) <= 1) ? "#" : "."
    if ([20,60,100,140,180,220].includes(c)){
      sum += (X*c)
    }
    if (s == 1) {
      s = 0
      X += n
      i += 1
      c += 1
      continue
    }
    if (m == "noop") {
      i += 1
      c += 1
      continue
    }
    s += 1
    c += 1
    continue
  }
  for (let i = 0; i < 240; i+=40) {
    console.log(crt.slice(i, i+40).join(''))
  }
  var part1=sum
  return [part1, "See CRT"]
}

visualize = () => {
  let c = []
  for (let i = 0; i < 240; i+=40) {
    c.push(crt.slice(i, i+40))
  }
  let viz = {
    view: ()=> m('div', { style: "text-align:left"}, c
      .map(r => m('div',{style: "display:flex; flex-direction:row"},r
        .map(x=> m('div', {style: {
          width: "1em",
          height: "1em",
          "background-color": x == "#" ? "black":""
        }})))))
  }
  m.mount(document.getElementById('visual'), viz);
}
