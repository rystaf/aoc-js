const fs = require('fs')
const [ year, day ] = process.argv.slice(2)
const dir = `./${year}/${day}`
require(`${dir}/main.js`)
fs.readdirSync(dir)
  .filter(x => x.includes('.txt'))
  .map(x => {
    let input = fs.readFileSync(`${dir}/${x}`, 'utf8')
    if (input.split('').reverse()[0] == '\n') {
      input = input.split('').reverse().slice(1).reverse().join('')
    }
    let outputFile = `${dir}/${x.split('.')[0]}.json`;
    let output = []
    if (fs.existsSync(outputFile)) {
      output = require(outputFile)
    }
    return [x, input, output]
  })
  .forEach(([file, input, output]) => {
    let result = main(input)
    console.log(file, result, ...output.map((x,i) => Math.round(result[i]/x*100)+'%'))
  })
