const ip = require('ip');
const chalk = require('chalk');
const express = require('express');
const next = require('next').default;
const helmet = require('helmet');
const { createProxyMiddleware } = require('http-proxy-middleware');

const logger = require('./shared/helpers/logger');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(helmet());

  ['/api', '/data', '/tensorboard/proxy'].map((url) =>
    server.use(
      url,
      createProxyMiddleware({
        target: process.env.API_URL,
        changeOrigin: true,
        secure: false,
      }),
    ),
  );

  server.get('*', (req, res) => handle(req, res));

  const port = parseInt(process.env.PORT, 10) || 3000;
  server.listen(port, (err) => {
    if (err) throw err;

    if (dev) {
      logger.log('info', chalk.magenta('Server is running'));
      logger.log('info', chalk.magenta(`> Local on http://localhost:${port}`));
      logger.log(
        'info',
        chalk.magenta(`> Lan on http://${ip.address()}:${port}`),
      );
      logger.log('info', chalk.magenta(`> API_URL is ${process.env.API_URL}`));
    } else {
      logger.log('info', 'Server is running');
      logger.log('info', `> Lan on http://${ip.address()}:${port}`);
      logger.log('info', `> API_URL is ${process.env.API_URL}`);
    }
  });
});
