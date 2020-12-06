main = input => {
  var groups = input.split('\n\n')
    .map(g => g.replace(/\n/g,'').split('')
      .reduce((a, b) => a.includes(b) ? a : a + b, ''))
    .map(x => x.length)
    .reduce((a, b) => a+b,0)
  return [groups]

}
