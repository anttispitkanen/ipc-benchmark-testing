/**
 * This is the main process that run the surrounding functionality, and runs
 * TheOperation as a dependency injection. This is so that all versions of
 * TheOperation, regardless of implementation, share the same simple API of
 * taking data in, running TheOperation, and returning the outcome. The only
 * thing that varies is whether TheOperation is running as a separate process,
 * and how the data is transferred between the processes.
 */
import {
  EMockDataSize,
  TStatistics,
  EIPCMethod,
  TTheOperationWrapper,
} from 'ipc-benchmark-testing-types';
import { loadMockData } from './mockData';
import { timestamp } from './timestamp';
import { documentResults } from './documentResults';

const MOCK_DATA_SIZE = (process.env.MOCK_DATA_SIZE ||
  EMockDataSize.MEDIUM) as EMockDataSize;

const DATE = new Date();

const mockData = loadMockData(MOCK_DATA_SIZE);

const mainProcessRunner = async (
  TheOperationWrapper: TTheOperationWrapper,
): Promise<TStatistics> => {
  const startMainProcess = timestamp();

  const result = await TheOperationWrapper(mockData);

  const endMainProcess = timestamp();

  console.log(result);

  const durationMs = endMainProcess - startMainProcess;
  const TheOperationDurationMs = result.durationMs;
  const overheadDurationMs = durationMs - TheOperationDurationMs;
  const overheadPercentage = (overheadDurationMs / durationMs) * 100;

  console.log(`mainProcess took in total ${durationMs} milliseconds.`);
  console.log(`TheOperation took ${TheOperationDurationMs} milliseconds.`);
  console.log(
    `The overhead was ${overheadDurationMs} milliseconds, or ${overheadPercentage} %`,
  );

  return {
    durationMs,
    TheOperationDurationMs,
    overheadDurationMs,
    overheadPercentage,
  };
};

/**
 * Each IPC can import this function and give the desired data transport method
 * as a dependency injection.
 */
export const mainProcess = (
  TheOperationWrapper: TTheOperationWrapper,
  ipcMethod: EIPCMethod,
) => {
  // Wait five seconds before launching main process, to give potential
  // side processes / sidecar containers some time to start.
  setTimeout(async () => {
    const statistics = await mainProcessRunner(TheOperationWrapper);

    // Write the results in a file
    documentResults(DATE, ipcMethod, MOCK_DATA_SIZE, statistics);
  }, 5000);
};
