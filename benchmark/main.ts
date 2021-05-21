import { mainProcess, EDataTransportMethod } from '../shared/mainProcess';
import { IMockData } from '../shared/mockData';
import { TheOperation } from '../shared/TheOperation';

/**
 * Run TheOperation in the same process.
 */
const runTheOperation = (data: IMockData[]) =>
  Promise.resolve(TheOperation(data));

mainProcess(runTheOperation, EDataTransportMethod.BENCHMARK);
