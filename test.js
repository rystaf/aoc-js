#!/bin/node
const fs = require('fs')
const http = require('https');
const { exec } = require('child_process')

const now = new Date()
const arg = process.argv.slice(2).filter(x => !x.includes('-'))
const flags = process.argv.slice(2).filter(x => x.includes('-')).map(x => x.slice(1))
const year = arg[1] || (now.getMonth() == 11 ? now.getFullYear() : now.GetFullYear()-1)
const day = (arg[0] || (now.getMonth() == 11 ? now.getDate().toString() : "31")).padStart(2, "0")
const file = arg[2]
const dir = `./${year}/${day}`
const session = !fs.existsSync('.SESSION') || fs.readFileSync('.SESSION', 'utf8').replace(/\n+$/,'').trim()

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
  fs.writeFileSync(`${dir}/main.js`, 'main = input => { return [0,0] }')
  fs.writeFileSync(`${dir}/sample.txt`, '')
  fs.writeFileSync(`${dir}/sample.json`, '[0,0]')
}

require(`${dir}/main.js`)

const request = (options) => new Promise((resolve, reject) => {
  const req = http.request(options, (response) => {
      let data = ''
      response.on('data', chunk => {
          data = data + chunk.toString();
      })
      response.on('end', () => resolve(data))
  })
  req.on('error', (error) => reject(error))
  req.end();
})

const test = async() => {
  if (session && !fs.existsSync(`${dir}/my.txt`)) {
    console.log('fetching input')
    const myInput = await request({
      hostname: 'adventofcode.com',
      port: 443,
      path: `/${year}/day/${parseInt(day)}/input`,
      method: 'GET',
      headers: {
        'Cookie': `session=${session}`
      }
    })
    fs.writeFileSync(`${dir}/my.txt`, myInput)
  }
  fs.readdirSync(dir)
    .filter(filename => filename.includes((file || '')+'.txt'))
    .map(filename => {
      const input = fs.readFileSync(`${dir}/${filename}`, 'utf8').replace(/\n+$/,'')
      const outputFile = `${dir}/${filename.split('.')[0]}.json`;
      const output = fs.existsSync(outputFile) ? require(outputFile) : false
      return [filename, input, output]
    })
    .forEach(([file, input, output]) => {
      const result = main(input)
      console.log(file, result, ...(output ? output.map((x,i) => (x ? Math.round(result[i]/x*100) : (result[i]?0:100))+'%'):[]))
    })
  if (session && !fs.existsSync('my.json')) {

  }
}
test()
const fetchPrompt = async () => {
  console.log('fetching prompt')
  const html = await request({
    hostname: 'adventofcode.com',
    port: 443,
    path: `/${year}/day/${parseInt(day)}`,
    method: 'GET',
    headers: {
      'Cookie': `session=${session}`
    }
  })
  fs.writeFileSync(`${dir}/prompt.html`, html
    .split(/<\/?article[a-z ="-]*>/)
    .filter((x,i) => i % 2)
    .join('\n\n'))
  exec(`pandoc --columns=80 ${dir}/prompt.html -t gfm -o ${dir}/prompt.md`, (err, stdout, stderr) => {
    if (err || stderr) {
      console.error(err || stderr);
      return
    }
    fs.unlinkSync(`${dir}/prompt.html`)
  })
}
if (!fs.existsSync(`${dir}/prompt.md`)) fetchPrompt()
