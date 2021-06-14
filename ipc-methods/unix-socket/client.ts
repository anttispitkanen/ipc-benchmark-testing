/**
 * This is the version where the data is sent for TheOperation to process
 * in a different container using net over a Unix socket.
 */
import * as net from 'net';
import { TMockData, TTheOperationResults } from 'ipc-benchmark-testing-types';

const THE_OPERATION_SOCKET_PATH = process.env.THE_OPERATION_SOCKET_PATH;

if (!THE_OPERATION_SOCKET_PATH || THE_OPERATION_SOCKET_PATH.length === 0) {
  throw Error('Valid socket path needed!');
}

const DELIMITER = '###';

export const unixSocketTransportMethod = (
  mockData: TMockData[],
): Promise<TTheOperationResults> =>
  new Promise(resolve => {
    const client = new net.Socket();

    client.connect(THE_OPERATION_SOCKET_PATH, () => {
      console.log('Connected!');
      client.write(JSON.stringify(mockData) + DELIMITER);
    });

    let responseData = '';

    client.on('data', data => {
      responseData += data.toString();

      if (responseData.indexOf(DELIMITER) !== -1) {
        const json = JSON.parse(
          responseData.split(DELIMITER)[0],
        ) as TTheOperationResults;

        client.end();

        client.destroy();

        resolve(json);
      }
    });
  });
