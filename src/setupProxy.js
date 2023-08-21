const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/proxy", {
      target: "https://dev.smalsuolis.biip.lt/api/",
      changeOrigin: true,
      pathRewrite: {
        "^/proxy": ""
      },
      headers: {
        Connection: "keep-alive"
      }
    })
  );
};
