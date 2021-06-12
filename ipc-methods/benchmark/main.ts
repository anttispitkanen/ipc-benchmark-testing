import { TMockData, EIPCMethod } from 'ipc-benchmark-testing-types';
import { mainProcess } from '../../shared/mainProcess';
import { TheOperation } from '../../shared/TheOperation';

/**
 * Run TheOperation in the same process.
 */
const runTheOperation = (data: TMockData[]) =>
  Promise.resolve(TheOperation(data));

mainProcess(runTheOperation, EIPCMethod.BENCHMARK);
