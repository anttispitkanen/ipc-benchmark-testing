/**
 * This is the HTTP server that listens for connections, and performs
 * TheOperation on incoming requests.
 */
import * as http from 'http';
import { TheOperation } from '../shared/TheOperation';
import { IMockData } from '../shared/mockData';

const handler = (req: http.IncomingMessage, res: http.ServerResponse) => {
  res.setHeader('Content-Type', 'application/json');
  switch (req.method) {
    case 'POST':
      let body = '';

      req.on('data', chunk => {
        body += chunk;
      });
      req.on('end', () => {
        try {
          const requestData = JSON.parse(body);

          const result = TheOperation(requestData as IMockData[]);

          res.writeHead(200);
          res.end(JSON.stringify(result));
          console.log('My work here is done.');
          process.exit(0);
        } catch (err) {
          res.writeHead(500);
          res.end(JSON.stringify({ error: 'Something went wrong :/' }));
        }
      });
      break;
    default:
      res.writeHead(400);
      res.end(JSON.stringify({ error: `Unsupported method ${req.method} :(` }));
      break;
  }
};

const server = http.createServer(handler);
server.listen(3000, undefined, undefined, () => {
  console.log('Listening for HTTP on port 3000');
});
