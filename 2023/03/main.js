main = input => {

  const adjacent = (list, x) => list.filter((l, i) => (i >= x-1) && (i <= x+1))

  return input.split('\n').reduce((total, line, y, s) => {
    let n = '';
    let valid = false;
    line.split('').forEach((l, x) => {
      if (!isNaN(l)) {
        n += l
        valid = valid || adjacent(s, y)
          .flatMap(line => adjacent(line.split(''), x))
          .some(x => x != "." && isNaN(x))
      }
      if (isNaN(l) || x == line.length - 1) {
        if (n.length && valid) {
          total[0] += parseInt(n)
        }
        n = '';
        valid = false;
      }
    })
    return total
  }, [0, 0])
}
