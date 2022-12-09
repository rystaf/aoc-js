main = input => {
  var rows = input.split('\n')
  n = rows.length
  part2 = 0
  trees = rows.join('').split('').map(x => parseInt(x)).map((h,i,s) => {
    let sides = [
        s.filter((x,ii)=>i%n == ii%n).slice(0,Math.floor(i/n)).reverse(), // top
        s.slice(i+1, (Math.floor(i/n)+1)*n), // right
        s.filter((x,ii)=>i%n == ii%n).slice(Math.floor(i/n)+1,n), // bottom
        s.slice(Math.floor(i/n)*n, i).reverse(), // left
    ]
    let score = sides.map(s => (s.findIndex(x => x >= h)+1)||s.length)
      .reduce((a,b)=>a*b,1)
    if (score > part2) {
      part2 = score
    }
    let visable = sides.map(s => s.every(t=>h>t))
    return {h,visable,score}
  })
  var part1 = trees.filter(x => x.visable.some(s => s)).length

  return [part1, part2]
}
visualize = () => {
  console.log(trees)
  if (typeof m == "undefined") return
  var viz = {
    view: ()=>m('div', {style: {"font-size":".6em", "background-color":"#043300"}}, trees.slice(0,n)
      .map((t,i,s) => {
        let start = Math.floor(i/n)
        return trees.slice(i*n,i*n+n)
      })
      .map(r => m('div',{style: {display:"flex", "flex-direction": "row"}}, r.map(t => m('div', { style: {
        "background-color": "rgba(0,255,0,"+(t.h/10)+")",
        ...(t.score == part2 ? {border: "1px solid yellow"} : {padding:"1px"}),
        color: t.visable.every(x=>!x) ? "grey":"white",
        height: "12px", width: "12px",
      }}, t.h)))))
  }
  m.mount(document.getElementById('visual'), viz);
}

