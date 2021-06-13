import { EIPCMethod } from 'ipc-benchmark-testing-types';
import { mainProcess } from '../../shared/mainProcess';
import { tcpTransportMethod } from './client';

mainProcess(tcpTransportMethod, EIPCMethod.TCP);
