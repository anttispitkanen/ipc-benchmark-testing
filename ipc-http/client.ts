/**
 * This is the version where the data is sent for TheOperation to process
 * in a different container using HTTP.
 */
import * as http from 'http';
import { TMockData, TTheOperationResults } from 'ipc-benchmark-testing-types';

const { THE_OPERATION_ENDPOINT_HOSTNAME, THE_OPERATION_ENDPOINT_PORT } =
  process.env;

const options: http.RequestOptions = {
  hostname: THE_OPERATION_ENDPOINT_HOSTNAME,
  port: THE_OPERATION_ENDPOINT_PORT,
  path: '/',
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
};

export const httpTransportMethod = (
  data: TMockData[],
): Promise<TTheOperationResults> =>
  new Promise(resolve => {
    const req = http.request(options, res => {
      let responseData = '';

      res.on('data', chunk => {
        responseData += chunk;
      });

      res.on('end', () => {
        resolve(JSON.parse(responseData) as TTheOperationResults);
      });
    });

    req.on('error', err => {
      console.error(err);
    });

    req.write(JSON.stringify(data));

    req.end();
  });
