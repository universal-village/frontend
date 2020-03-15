const config = require("./src/config");
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
    proxy: 'http://40.112.131.74/webapi',
  },
  pwa: {
    name: config.conference.name.short,
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppStatusBarStyle: 'black',

    // configure the workbox plugin
    workboxPluginMode: 'GenerateSW',
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        GIT_VERSION: JSON.stringify(commitHash).trim(),
      }),
    ],
  },
};
