const config = require("./src/config");
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
    proxy: 'http://localhost:8080',
  },
  pwa: {
    name: config.conference.name.short,
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppStatusBarStyle: 'black',

    // configure the workbox plugin
    workboxPluginMode: 'GenerateSW',
  },
};
