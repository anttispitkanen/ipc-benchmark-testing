import type { EIPCMethod } from 'ipc-benchmark-testing-types';
import { mainProcess } from '../shared/mainProcess';
import { httpExpressAxiosTransportMethod } from './client';

mainProcess(
  httpExpressAxiosTransportMethod,
  'http-express-axios' as EIPCMethod.HTTP_EXPRESS_AXIOS,
);
