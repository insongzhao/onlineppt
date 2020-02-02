// vue.config.js
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

let ApiOnlineProxyList = {
  "/api": {
    // target: 'http://www.insozhao.cn/',
    target: "http://47.101.146.230/",
    ws: true,
    changeOrigin: true,
    pathRewrite:{
      "^/api": ""
    }
}

};
module.exports = {
  // context: [],

  configureWebpack: {
    devtool: "source-map"
  },

  lintOnSave: process.env.NODE_ENV !== "production",
  // outputDir: "../html/interact_vue_module",
  publicPath: "/",
  assetsDir: "./assets",
  devServer: {
    port: 8080,
    proxy: ApiOnlineProxyList
  },

  chainWebpack: config => {
    config.resolve.alias.set("assets", resolve("src/assets"));
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach(type =>
      addStyleResource(config.module.rule("scss").oneOf(type))
    );
  }
};

function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [path.resolve(__dirname, "./src/styles/index.scss")]
    });
}