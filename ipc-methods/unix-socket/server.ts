/**
 * This is the net server that listens to connections on a unix socket and
 * performs TheOperation on incoming requests.
 */
import { TMockData } from 'ipc-benchmark-testing-types';
import * as net from 'net';
import { TheOperation } from '../../shared/TheOperation';

const THE_OPERATION_SOCKET_PATH = process.env.THE_OPERATION_SOCKET_PATH;

if (!THE_OPERATION_SOCKET_PATH || THE_OPERATION_SOCKET_PATH.length === 0) {
  throw Error('Valid socket path needed!');
}

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
      socket.destroy();
      process.exit(0);
    }
  });
});

server.listen(THE_OPERATION_SOCKET_PATH, () => {
  console.log(`Listening on ${THE_OPERATION_SOCKET_PATH}`);
});
