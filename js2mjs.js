const fs = require('fs')
const path = require('path')
const dirname = path.resolve(__dirname, 'esm')

for (const filename of fs.readdirSync(dirname)) {
  if (filename.endsWith('.js')) {
    fs.renameSync(path.resolve(dirname, filename), path.resolve(dirname, filename.replace(/\.js$/, '.mjs')))
  }
}
