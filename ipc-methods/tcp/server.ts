/**
 * This is the TCP server that listens for connections, and performs
 * TheOperation on incoming requests.
 */
import { TMockData } from 'ipc-benchmark-testing-types';
import * as net from 'net';
import { TheOperation } from '../../shared/TheOperation';

const PORT = 3000;

const DELIMITER = '###';

const server = net.createServer(socket => {
  let requestData = '';

  socket.on('data', data => {
    requestData += data.toString();

    if (requestData.indexOf(DELIMITER) !== -1) {
      const json = JSON.parse(requestData.split(DELIMITER)[0]) as TMockData[];

      const result = TheOperation(json);

      socket.write(JSON.stringify(result) + DELIMITER);

      socket.end();
      console.log('My work here is done');
      process.exit(0);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
