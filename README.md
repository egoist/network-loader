
# network-loader

[![NPM version](https://img.shields.io/npm/v/network-loader.svg?style=flat)](https://npmjs.com/package/network-loader) [![NPM downloads](https://img.shields.io/npm/dm/network-loader.svg?style=flat)](https://npmjs.com/package/network-loader) [![CircleCI](https://circleci.com/gh/egoist/network-loader/tree/master.svg?style=shield)](https://circleci.com/gh/egoist/network-loader/tree/master)  [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/egoist/donate) [![chat](https://img.shields.io/badge/chat-on%20discord-7289DA.svg?style=flat)](https://chat.egoist.moe)

_This is just for fun._

You can just import from a URL and use it like this:

```js
import Vue from 'https://unpkg.com/vue/dist/vue.js'

new Vue({
  el: '#app',
  template: '<h1>hello {{ msg }}</h1>',
  data: {
    msg: 'world'
  }
})
```

## Install

```bash
yarn add network-loader
```

## Usage

In your webpack config:

```js
// webpack.config.js
module.exports = {
  entry: './main.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'network-loader',
        exclude: [/node_modules/]
      }
    ]
  }
}
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**network-loader** © [EGOIST](https://github.com/egoist), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by EGOIST with help from contributors ([list](https://github.com/egoist/network-loader/contributors)).

> [github.com/egoist](https://github.com/egoist) · GitHub [@EGOIST](https://github.com/egoist) · Twitter [@_egoistlily](https://twitter.com/_egoistlily)
