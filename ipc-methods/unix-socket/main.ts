import { EIPCMethod } from 'ipc-benchmark-testing-types';
import { mainProcess } from '../../shared/mainProcess';
import { unixSocketTransportMethod } from './client';

mainProcess(unixSocketTransportMethod, EIPCMethod.UNIX_SOCKET);
