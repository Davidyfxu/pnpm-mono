module.exports = {
  webpack: (config) => {
    config.output.library = "qk_app1";
    config.output.libraryTarget = "umd";
    config.output.publicPath = "http://localhost:3010/";
    return config;
  },
  devServer: (config) => {
    config.headers = {
      "Access-Control-Allow-Origin": "*",
    };
    return config;
  },
};
