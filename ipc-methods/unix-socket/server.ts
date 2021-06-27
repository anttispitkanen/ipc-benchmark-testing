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
const END_COMMAND = 'END_COMMAND';

const server = net.createServer(socket => {
  let requestData = '';

  socket.on('data', data => {
    requestData += data.toString();

    if (requestData.indexOf(DELIMITER) !== -1) {
      const [prev, next] = requestData.split(DELIMITER);

      requestData = next;

      const json = JSON.parse(prev) as TMockData[];

      const result = TheOperation(json);

      socket.write(JSON.stringify(result) + DELIMITER);
    }

    if (requestData === END_COMMAND) {
      socket.end();
      socket.destroy();
      console.log('My work here is done');
      process.exit(0);
    }
  });
});

server.listen(THE_OPERATION_SOCKET_PATH, () => {
  console.log(`Listening on ${THE_OPERATION_SOCKET_PATH}`);
});
