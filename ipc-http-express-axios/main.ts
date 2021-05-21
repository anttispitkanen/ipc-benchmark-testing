import { mainProcess, EDataTransportMethod } from '../shared/mainProcess';
import { httpExpressAxiosTransportMethod } from './client';

mainProcess(
  httpExpressAxiosTransportMethod,
  EDataTransportMethod.HTTP_EXPRESS_AXIOS,
);
