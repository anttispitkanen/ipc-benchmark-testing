/**
 * This is the HTTPS server that listens for connections, and performs
 * TheOperation on incoming requests.
 */
import * as fs from 'fs';
import { RequestListener } from 'http';
import * as https from 'https';
import { TMockData } from 'ipc-benchmark-testing-types';
import { TheOperation } from '../../shared/TheOperation';

const { KEY_PATH, CERT_PATH } = process.env;

const options = {
  key: fs.readFileSync(KEY_PATH || ''),
  cert: fs.readFileSync(CERT_PATH || ''),
};

const handler: RequestListener = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  switch (req.method) {
    case 'POST':
      let body = '';

      req.on('data', chunk => {
        body += chunk.toString();
      });

      req.on('end', () => {
        try {
          const requestData = JSON.parse(body) as TMockData[];

          const result = TheOperation(requestData);

          res.writeHead(200);
          res.end(JSON.stringify(result));
        } catch (err) {
          res.writeHead(500);
          res.end(JSON.stringify({ error: 'Something went wrong :/' }));
        }
      });
      break;

    case 'GET':
      res.writeHead(200);
      res.end();
      // Wait for the response to be closed before shutting down to avoid
      // connection reset errors
      res.on('close', () => {
        console.log('My work here is done.');
        process.exit(0);
      });

      break;

    default:
      res.writeHead(400);
      res.end(JSON.stringify({ error: `Unsupported method ${req.method} :(` }));
      break;
  }
};

const server = https.createServer(options, handler);

server.listen(3000, undefined, undefined, () => {
  console.log('Listening for HTTPS on port 3000');
});
