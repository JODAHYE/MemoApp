const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api', {
      // target: 'https://colorful-memo.herokuapp.com',
      target: 'http://localhost:5000',  //node 서버
      changeOrigin: true,
    })
  );
};