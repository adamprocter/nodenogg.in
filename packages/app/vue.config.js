process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
  chainWebpack: config => config.resolve.symlinks(false)
}
