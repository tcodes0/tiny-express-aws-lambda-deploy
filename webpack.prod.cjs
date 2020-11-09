/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge')
const common = require('./webpack.common.cjs')

const prodConfig = {}

prodConfig.mode = 'none'
prodConfig.entry = {
  index: './app/index.ts',
}
prodConfig.plugins = []
const config = merge(common, prodConfig)

module.exports = config
