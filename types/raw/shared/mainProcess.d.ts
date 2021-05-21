import { TTheOperationWrapper } from './TheOperation';
export declare enum EDataTransportMethod {
    BENCHMARK = "benchmark",
    HTTP = "http",
    HTTP_EXPRESS_AXIOS = "http-express-axios"
}
/**
 * Each IPC can import this function and give the desired data transport method
 * as a dependency injection.
 */
export declare const mainProcess: (TheOperationWrapper: TTheOperationWrapper, dataTransportMethod: EDataTransportMethod) => void;
