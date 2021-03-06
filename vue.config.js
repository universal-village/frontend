const webpack = require("webpack");

let commitHash = require('child_process')
  .execSync('git rev-parse --short HEAD')
  .toString();


module.exports = {
  assetsDir: '_/',
  runtimeCompiler: true,

  pluginOptions: {
    i18n: {
      locale: 'zh',
      fallbackLocale: 'zh',
      localeDir: 'locales',
      enableInSFC: true,
    },
  },
  integrity: true,
  productionSourceMap: false,
  devServer: {
    proxy: 'http://52.54.156.175',
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        GIT_VERSION: JSON.stringify(commitHash).trim(),
      }),
    ],
  },
};
