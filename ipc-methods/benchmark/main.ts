import { TMockData, EIPCMethod } from 'ipc-benchmark-testing-types';
import { mainProcess } from '../../shared/mainProcess';
import { TheOperation } from '../../shared/TheOperation';

const TheOperationWrapper = {
  // Run TheOperation in the same process.
  runTheOperation: (data: TMockData[]) => Promise.resolve(TheOperation(data)),
  // No other container/process to close
  close: () => Promise.resolve(),
};

mainProcess(TheOperationWrapper, EIPCMethod.BENCHMARK);
