#!/bin/node
const fs = require('fs')
const https = require('https');
const { exec } = require('child_process')
const querystring = require('querystring');

const now = new Date()
const arg = process.argv.slice(2).filter(x => !x.includes('-'))
const flag = process.argv.slice(2).filter(x => x.includes('-')).map(x => x.slice(1)).reduce((a,b) => ({...a,[b]:true}), {})
let y = arg[1]
let d = arg[0]
if (arg[0]?.length == 4) {
  y = arg[0]
  d = arg[1]
}
const year = y || (now.getMonth() == 11 ? now.getFullYear() : now.getFullYear()-1)
const day = (d || ((now.getMonth() == 11 && now.getFullYear() == year) ? now.getDate().toString() : "1")).padStart(2, "0")
const file = arg[2]
const dir = `./${year}/${day}`
const session = fs.existsSync('.SESSION') ? fs.readFileSync('.SESSION', 'utf8').replace(/\n+$/,'').trim() : false
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
let setup = false

if (!fs.existsSync(dir)) {
  if (!fs.existsSync(`./${year}`)) fs.mkdirSync(`./${year}`)
  fs.mkdirSync(dir)
  fs.writeFileSync(`${dir}/main.js`, 'main = input => {\n var part1=0\n var part2=0\n return [part1, part2]\n}')
  fs.writeFileSync(`${dir}/sample.txt`, '')
  fs.writeFileSync(`${dir}/sample.json`, '[0,0]')
  setup = true
}

require(`${dir}/main.js`)

const request = (options, postData) => new Promise((resolve, reject) => {
  if (postData) {
    var payload = querystring.stringify(postData)
    options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': payload.length,
      ...options.headers
    }
  }
  const req = https.request(options, (response) => {
    let data = ''
    response.on('data', chunk => {
        data = data + chunk.toString();
    })
    response.on('end', () => {
      if (response.statusCode > 200) return reject(data)
      resolve(data)
    })
  })
  req.on('error', (error) => reject(error))
  if (postData) req.write(payload)
  req.end();
})

const fetchPrompt = () => new Promise(async (resolve, reject) => {
  console.log('fetching prompt')
  if (!fs.existsSync(`${dir}/prompt.html`)) {
    const html = await request({
      hostname: 'adventofcode.com',
      port: 443,
      path: `/${year}/day/${parseInt(day)}`,
      method: 'GET',
      ...(session ? { headers: {'Cookie': `session=${session}`} } : {}),
    })

    fs.writeFileSync(`${dir}/prompt.html`, html
      .split(/<\/?article[a-z ="-]*>/)
      .filter((x,i) => i % 2)
      .join('\n\n'))

    var answers = Array.from(html.matchAll(/<p>Your puzzle answer was <code>([0-9]+)<\/code>/g))
      .map(x => x.find((a,i)=>i==1))
    fs.writeFileSync(`${dir}/my.json`, JSON.stringify(answers))
  }

  exec(`pandoc --columns=80 ${dir}/prompt.html -t gfm -o ${dir}/prompt.md`, (err, stdout, stderr) => {
    if (err || stderr) {
      console.error(err || stderr);
      return reject()
    }
    fs.unlinkSync(`${dir}/prompt.html`)
    resolve()
  })
})

const test = async() => {
  console.log(dir)
  if (setup) return
  if (!fs.existsSync(`${dir}/prompt.md`)) await fetchPrompt()
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
  let myResult
  fs.readdirSync(dir)
    .filter(filename => filename.includes((file || '')+'.txt'))
    .map(filename => {
      const input = fs.readFileSync(`${dir}/${filename}`, 'utf8').replace(/\n+$/,'')
      const outputFile = `${dir}/${filename.split('.')[0]}.json`;
      const output = fs.existsSync(outputFile) ? require(outputFile) : false
      return [filename, input, output]
    })
    .forEach(([file, input, output]) => {
      const result = main(input.replace(/\r/g,''))
      if (file == 'my.txt') myResult = result
      console.log(file, result, ...(output ? output
        .map((x,i) => isNaN(x)
          ? (x == result[i])
          : (x ? Math.round(result[i]/x*100) : (result[i]?0:100))+'%'):[]))
    })
  if (session) {
    let part = 0
    if (fs.existsSync(`${dir}/my.json`)) {
      var output = require(`${dir}/my.json`)
      if (output.length == 2) return
      if (output[0] && !output[1]) part = 1
    }
    rl.question(`Submit ${myResult[part]} for part ${part+1}? `, async answer => {
      const response = await request({
        hostname: 'adventofcode.com',
        port: 443,
        path: `/${year}/day/${parseInt(day)}/answer`,
        method: 'POST',
        headers: {
          'Cookie': `session=${session}`,
        }
      }, { 
        level: (part+1).toString(),
        answer: myResult[part].toString() })
      const start = response.indexOf('<article><p>')
      const length = response.slice(start+12).indexOf('<')
      const message = response.substring(start+12,start+12+length)
      console.log(message)
      rl.close();
      if (message.includes("That's the right answer")){
        if (part == 0) {
          await fetchPrompt()
        } else {
          let out = output || []
          out[part] = myResult[part]
          fs.writeFileSync(`${dir}/my.json`, JSON.stringify(out))
        }
      }
    })
  }
}
test()
