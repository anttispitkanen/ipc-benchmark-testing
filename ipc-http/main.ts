import type { EIPCMethod } from 'ipc-benchmark-testing-types';
import { mainProcess } from '../shared/mainProcess';
import { httpTransportMethod } from './client';

mainProcess(httpTransportMethod, 'http' as EIPCMethod.HTTP);
