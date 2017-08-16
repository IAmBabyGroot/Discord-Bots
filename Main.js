const child = require('child_process')

startAll()

async function startAll () {
  await start('Bots/MemesBot/index.js')
    .catch(function (reason) {
      console.error(reason)
    })
  await start('Bots/SelfBot/self.js')
    .catch(function (reason) {
      console.error(reason)
    })
  await start('Bots/Eval/main.js')
    .catch(function (reason) {
      console.error(reason)
    })
}

async function start (input) {
  const file = await child.spawn('node', [input])

  file.stdout.on('data', (data) => {
    console.log(String(data))
  })

  file.stderr.on('data', (data) => {
    console.error(String(data))
  })

  file.on('close', (code) => {
    console.log('child process exited with code ' + code)

    setTimeout(function () {
      start(input)
        .catch(function (reason) {
          console.error(reason)
        })
    }, 1000 * 5)
  })
}
