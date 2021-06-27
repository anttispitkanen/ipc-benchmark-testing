import { EIPCMethod } from 'ipc-benchmark-testing-types';
import { mainProcess } from '../../shared/mainProcess';
import { tcpTransportMethod, close } from './client';

const TheOperationWrapper = {
  runTheOperation: tcpTransportMethod,
  close,
};

mainProcess(TheOperationWrapper, EIPCMethod.TCP);
