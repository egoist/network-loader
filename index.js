const os = require('os')
const path = require('path')
const fs = require('fs-extra')
const fetch = require('node-fetch')
const babylon = require('babylon')
const generate = require('babel-generator')
const traverse = require('babel-traverse').default
const t = require('babel-types')
const filenamify = require('filenamify')

const temp = os.tmpdir()
const cache = new Map()

function fromNetwork(source) {
  return /^https?:\/\//.test(source)
}

module.exports = function (code) {
  const cb = this.async()

  const ast = babylon.parse(code, {
    sourceType: 'module',
    plugins: '*'
  })

  const cacheDir = path.join(temp, '.network-loader')

  const getPath = name => path.join(cacheDir, filenamify(name, {
    replacement: '-'
  }))

  traverse(ast, {
    ImportDeclaration(path) {
      const url = path.node.source.value
      if (!fromNetwork(url)) return

      const filePath = getPath(url)
      cache.set(url, {
        cached: false,
        filePath
      })
      path.replaceWith(
        t.importDeclaration(
          path.node.specifiers,
          t.stringLiteral(filePath)
        )
      )
    }
  })

  if (cache.size === 0) {
    return cb(null, code)
  }

  fs.ensureDir(cacheDir).then(() => Promise.all([...cache.keys()].map(url => {
    const { filePath, cached } = cache.get(url)
    if (cached) return null

    return fetch(url).then(res => res.text())
      .then(content => fs.writeFile(filePath, content, 'utf8'))
      .then(() => {
        cache.set(url, Object.assign(cache.get(url), {
          cached: true
        }))
      })
  }))).then(() => {
    const output = generate.default(ast, {}, code)
    cb(null, output.code, output.map)
  }).catch(cb)
}
