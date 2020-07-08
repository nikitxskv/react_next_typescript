const express = require('express');
const next = require('next').default;
const helmet = require('helmet');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(helmet());

  server.get('*', (req, res) => handle(req, res));

  const port = parseInt(process.env.PORT, 10) || 3000;
  server.listen(port);
});
