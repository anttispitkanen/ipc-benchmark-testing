import { EIPCMethod } from 'ipc-benchmark-testing-types';
import { mainProcess } from '../../shared/mainProcess';
import { httpsTransportMethod, close } from './client';

const TheOperationWrapper = {
  runTheOperation: httpsTransportMethod,
  close,
};

mainProcess(TheOperationWrapper, EIPCMethod.HTTPS);
