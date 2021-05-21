import { mainProcess, EDataTransportMethod } from '../shared/mainProcess';
import { httpTransportMethod } from './client';

mainProcess(httpTransportMethod, EDataTransportMethod.HTTP);
