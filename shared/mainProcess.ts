/**
 * This is the main process that run the surrounding functionality, and runs
 * TheOperation in a way defined in a dependency injection TheOperationInterface.
 * This is so that all versions of TheOperation, regardless of implementation,
 * share the same simple API of taking data in, running TheOperation, and returning
 * the outcome. The only thing that varies is whether TheOperation is running as a
 * separate process, and how the data is transferred between the processes.
 */
import { mockDataCreator } from "./mockData";
import { timestamp } from "./timestamp";
import {
  TheOperationCreator,
  EDataTransportMethod,
} from "./TheOperationInterface";

const DATA_TRANSPORT_METHOD = process.env
  .DATA_TRANSPORT_METHOD as EDataTransportMethod;

const mockData = mockDataCreator();

const main = async () => {
  const startMainProcess = timestamp();

  const result = await TheOperationCreator(DATA_TRANSPORT_METHOD)(mockData);

  const endMainProcess = timestamp();

  console.log(result);

  const duration = endMainProcess - startMainProcess;
  const TheProcessDuration = result.duration;
  const overHeadDuration = duration - TheProcessDuration;
  const overheadPercentage = (overHeadDuration / duration) * 100;

  console.log(`mainProcess took in total ${duration} seconds.`);
  console.log(`TheOperation took ${result.duration} seconds.`);
  console.log(
    `The "overhead" was ${
      duration - result.duration
    } seconds, or ${overheadPercentage} %`
  );
};

// Wait five seconds before launching main process, to give potential
// side processess / sidecar containers some time to start.
setTimeout(() => {
  main();
}, 5000);
