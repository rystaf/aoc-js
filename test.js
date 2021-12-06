#!/bin/node
const fs = require('fs')
const https = require('https');
const { exec } = require('child_process')
const querystring = require('querystring');

const now = new Date()
const arg = process.argv.slice(2).filter(x => !x.includes('-'))
const flag = process.argv.slice(2).filter(x => x.includes('-')).map(x => x.slice(1)).reduce((a,b) => ({...a,[b]:true}), {})
const year = arg[1] || (now.getMonth() == 11 ? now.getFullYear() : now.GetFullYear()-1)
const day = (arg[0] || (now.getMonth() == 11 ? now.getDate().toString() : "31")).padStart(2, "0")
const file = arg[2]
const dir = `./${year}/${day}`
const session = !fs.existsSync('.SESSION') || fs.readFileSync('.SESSION', 'utf8').replace(/\n+$/,'').trim()
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

if (!fs.existsSync(dir)) {
  if (!fs.existsSync(`./${year}`)) fs.mkdirSync(`./${year}`)
  fs.mkdirSync(dir)
  fs.writeFileSync(`${dir}/main.js`, 'main = input => { return [0,0] }')
  fs.writeFileSync(`${dir}/sample.txt`, '')
  fs.writeFileSync(`${dir}/sample.json`, '[0,0]')
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
      response.on('end', () => resolve(data))
  })
  req.on('error', (error) => reject(error))
  if (postData) req.write(payload)
  req.end();
})

const fetchPrompt = async () => {
  console.log('fetching prompt')
  if (!fs.existsSync(`${dir}/prompt.html`)) {
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
  }

  exec(`pandoc --columns=80 ${dir}/prompt.html -t gfm -o ${dir}/prompt.md`, (err, stdout, stderr) => {
    if (err || stderr) {
      console.error(err || stderr);
      return
    }
    fs.unlinkSync(`${dir}/prompt.html`)
  })
}

const test = async() => {
  console.log(dir)
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
      const result = main(input)
      if (file == 'my.txt') myResult = result
      console.log(file, result, ...(output ? output.map((x,i) => (x ? Math.round(result[i]/x*100) : (result[i]?0:100))+'%'):[]))
    })
  if (flag.w && session) {
    let part = 0
    if (fs.existsSync(`${dir}/my.json`)) {
      var output = require(`${dir}/my.json`)
      if (output.filter(x => !isNaN(x)).length == 2) return
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
        let out = output || []
        out[part] = myResult[part]
        fs.writeFileSync(`${dir}/my.json`, JSON.stringify(out))
      }
    })
  }
}
test()
