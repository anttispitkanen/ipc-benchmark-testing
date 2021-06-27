import { EIPCMethod } from 'ipc-benchmark-testing-types';
import { mainProcess } from '../../shared/mainProcess';
import { httpTransportMethod, close } from './client';

const TheOperationWrapper = {
  runTheOperation: httpTransportMethod,
  close,
};

mainProcess(TheOperationWrapper, EIPCMethod.HTTP);
