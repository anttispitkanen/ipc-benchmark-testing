/**
 * This is the version where the data is sent for TheOperation to process
 * in a different container using TCP.
 */
import * as net from 'net';
import { TMockData, TTheOperationResults } from 'ipc-benchmark-testing-types';

const { THE_OPERATION_ENDPOINT_HOSTNAME, THE_OPERATION_ENDPOINT_PORT } =
  process.env;

const DELIMITER = '###';

export const tcpTransportMethod = (
  mockData: TMockData[],
): Promise<TTheOperationResults> =>
  new Promise(resolve => {
    const client = new net.Socket();

    client.connect(
      parseInt(THE_OPERATION_ENDPOINT_PORT || '0', 10),
      THE_OPERATION_ENDPOINT_HOSTNAME || '',
      () => {
        console.log('Connected!');
        client.write(JSON.stringify(mockData) + DELIMITER);
      },
    );

    let responseData = '';

    client.on('data', data => {
      responseData += data.toString();

      if (responseData.indexOf(DELIMITER) !== -1) {
        const json = JSON.parse(
          responseData.split(DELIMITER)[0],
        ) as TTheOperationResults;

        client.end();

        resolve(json);
      }
    });
  });
