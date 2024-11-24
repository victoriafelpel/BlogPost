// backend/frontend/src/setupProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Проксі для маршруту /posts
  app.use(
    '/posts',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
      onProxyReq: (proxyReq, req, res) => {
        console.log(`Proxying request to: ${req.method} ${req.originalUrl}`);
      },
      onError: (err, req, res) => {
        console.error('Proxy error:', err);
      },
    })
  );

  app.use(
    '/uploads',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
      onProxyReq: (proxyReq, req, res) => {
        console.log(`Proxying request to: ${req.method} ${req.originalUrl}`);
      },
      onError: (err, req, res) => {
        console.error('Proxy error:', err);
      },
    })
  );
};
