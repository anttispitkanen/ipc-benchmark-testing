import { EIPCMethod } from 'ipc-benchmark-testing-types';
import { mainProcess } from '../../shared/mainProcess';
import { httpExpressAxiosTransportMethod } from './client';

mainProcess(httpExpressAxiosTransportMethod, EIPCMethod.HTTP_EXPRESS_AXIOS);
