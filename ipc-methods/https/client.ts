/**
 * This is the version where the data is sent for TheOperation to process
 * in a different container using HTTPS.
 */
import * as fs from 'fs';
import * as https from 'https';
import { TMockData, TTheOperationResults } from 'ipc-benchmark-testing-types';

const {
  THE_OPERATION_ENDPOINT_HOSTNAME,
  THE_OPERATION_ENDPOINT_PORT,
  CERT_PATH,
} = process.env;

const options: https.RequestOptions = {
  hostname: THE_OPERATION_ENDPOINT_HOSTNAME,
  port: THE_OPERATION_ENDPOINT_PORT,
  path: '/',
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  ca: [fs.readFileSync(CERT_PATH || '')],
};

export const httpsTransportMethod = (
  data: TMockData[],
): Promise<TTheOperationResults> =>
  new Promise(resolve => {
    const req = https.request(options, res => {
      let responseData = '';

      res.on('data', chunk => {
        responseData += chunk.toString();
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

export const close = (): Promise<void> =>
  new Promise(resolve => {
    const req = https.request({ ...options, method: 'GET' }, res => {
      res.on('end', () => {
        resolve();
      });
    });

    req.end();
  });
