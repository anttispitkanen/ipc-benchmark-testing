import { EIPCMethod } from 'ipc-benchmark-testing-types';
import { mainProcess } from '../../shared/mainProcess';
import { httpsTransportMethod } from './client';

mainProcess(httpsTransportMethod, EIPCMethod.HTTPS);
