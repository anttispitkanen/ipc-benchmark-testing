import { EIPCMethod } from 'ipc-benchmark-testing-types';
import { mainProcess } from '../shared/mainProcess';
import { httpTransportMethod } from './client';

mainProcess(httpTransportMethod, EIPCMethod.HTTP);
