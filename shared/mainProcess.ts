/**
 * This is the main process that run the surrounding functionality, and runs
 * TheOperation in a way defined in a dependency injection TheOperationInterface.
 * This is so that all versions of TheOperation, regardless of implementation,
 * share the same simple API of taking data in, running TheOperation, and returning
 * the outcome. The only thing that varies is whether TheOperation is running as a
 * separate process, and how the data is transferred between the processes.
 */
import { mockDataCreator, EMockDataSize } from "./mockData";
import { timestamp } from "./timestamp";
import { documentResults, TStatistics } from "./documentResults";
import {
  TheOperationCreator,
  EDataTransportMethod,
} from "./TheOperationInterface";

const DATA_TRANSPORT_METHOD = process.env
  .DATA_TRANSPORT_METHOD as EDataTransportMethod;

const MOCK_DATA_SIZE = (process.env.MOCK_DATA_SIZE ||
  "medium") as EMockDataSize;

const DATE = new Date();

const mockData = mockDataCreator(MOCK_DATA_SIZE);

const main = async (): Promise<TStatistics> => {
  const startMainProcess = timestamp();

  const result = await TheOperationCreator(DATA_TRANSPORT_METHOD)(mockData);

  const endMainProcess = timestamp();

  console.log(result);

  const duration = endMainProcess - startMainProcess;
  const TheProcessDuration = result.duration;
  const overheadDuration = duration - TheProcessDuration;
  const overheadPercentage = (overheadDuration / duration) * 100;

  console.log(`mainProcess took in total ${duration} seconds.`);
  console.log(`TheOperation took ${result.duration} seconds.`);
  console.log(
    `The "overhead" was ${overheadDuration} seconds, or ${overheadPercentage} %`
  );

  return {
    duration,
    TheProcessDuration,
    overheadDuration,
    overheadPercentage,
  };
};

// Wait five seconds before launching main process, to give potential
// side processess / sidecar containers some time to start.
setTimeout(async () => {
  const statistics = await main();

  // Write the results in a file
  documentResults(DATE, DATA_TRANSPORT_METHOD, MOCK_DATA_SIZE, statistics);
}, 5000);
