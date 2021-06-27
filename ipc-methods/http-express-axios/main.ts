import { EIPCMethod } from 'ipc-benchmark-testing-types';
import { mainProcess } from '../../shared/mainProcess';
import { httpExpressAxiosTransportMethod, close } from './client';

const TheOperationWrapper = {
  runTheOperation: httpExpressAxiosTransportMethod,
  close,
};

mainProcess(TheOperationWrapper, EIPCMethod.HTTP_EXPRESS_AXIOS);
