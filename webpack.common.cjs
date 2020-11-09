/* eslint-disable @typescript-eslint/no-var-requires */
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')

const config = {}

/**
 * Root
 */
config.target = 'node'
config.context = __dirname
config.devtool = 'inline-source-map'
config.optimization = {
  minimizer: [new TerserPlugin()],
}
// config.externals = [{ 'aws-sdk': 'aws-sdk', saslprep: 'saslprep' }]
config.resolve = {
  extensions: ['.ts', '.tsx', '.js', 'jsx', '.json', '.mjs', 'cjs'],
}
config.output = {
  path: path.resolve(__dirname, 'build'),
  filename: '[name].js',
  library: 'index',
  libraryTarget: 'commonjs2',
}

/**
 * Module
 */
config.module = {}
config.module.rules = []
config.module.rules.push({
  test: /\.tsx?$/,
  loader: 'ts-loader',
  options: {
    // disable type checker - we will use it in fork-ts-checker-webpack-plugin
    transpileOnly: true,
  },
})
config.module.rules.push({
  test: /\.[mc]js$/,
  include: /node_modules/,
  type: 'javascript/auto',
})
/**
 * Plugins
 */
config.plugins = []
config.plugins.push(
  new webpack.DefinePlugin({
    'process.env.BROWSER': false,
    __DEV__: process.env.NODE_ENV !== 'production',
  })
)
/**
 * disable eslint integration here as warnings obscure actual errors in output
 * and code has minor warnings
 */
config.plugins.push(new ForkTsCheckerWebpackPlugin({ eslint: { enabled: false, files: '**/*.ts*' }, async: true }))

module.exports = config
