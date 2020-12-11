const fs = require('fs')
const [ year, day, file] = process.argv.slice(2)
const dir = `./${year}/${day}`
require(`${dir}/main.js`)
fs.readdirSync(dir)
  .filter(x => x.includes((file || '')+'.txt'))
  .map(x => {
    let input = fs.readFileSync(`${dir}/${x}`, 'utf8')
    let outputFile = `${dir}/${x.split('.')[0]}.json`;
    let output = []
    if (fs.existsSync(outputFile)) {
      output = require(outputFile)
    }
    return [x, input.replace(/\n+$/,''), output]
  })
  .forEach(([file, input, output]) => {
    let result = main(input)
    console.log(file, result, ...output.map((x,i) => (x ? Math.round(result[i]/x*100) : (result[i]?0:100))+'%'))
  })
