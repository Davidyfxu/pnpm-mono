module.exports = {
  webpack: (config) => {
    config.output.library = 'qk_app2'
    config.output.libraryTarget = 'umd'
    config.output.publicPath = 'http://localhost:3020/'
    return config
  },
  devServer: (config) => {
    config.headers = {
      'Access-Control-Allow-Origin': '*'
    }
    return config
  }
}
