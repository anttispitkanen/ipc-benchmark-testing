import { EIPCMethod } from 'ipc-benchmark-testing-types';
import { mainProcess } from '../../shared/mainProcess';
import { unixSocketTransportMethod, close } from './client';

const TheOperationWrapper = {
  runTheOperation: unixSocketTransportMethod,
  close,
};

mainProcess(TheOperationWrapper, EIPCMethod.UNIX_SOCKET);
