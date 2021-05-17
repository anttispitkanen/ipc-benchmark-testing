/**
 * Define a unified interface for TheOperation creator so that different
 * methods can be ran as sort of a dependency injection.
 */
import { IMockData } from "./mockData";
import { TheOperation, ITheOperationResults } from "./TheOperation";
import { httpTransportMethod } from "../ipc-http/client";
import { httpExpressAxiosTransportMethod } from "../ipc-http-express-axios/client";

// TODO: define more input types if more methods are tested
export enum EDataTransportMethod {
  BENCHMARK = "benchmark",
  HTTP = "http",
  HTTP_EXPRESS_AXIOS = "http-express-axios",
}

export type TTheOperationCreator = (
  dataTransportMethod: EDataTransportMethod
) => (data: IMockData[]) => Promise<ITheOperationResults>;

export const TheOperationCreator: TTheOperationCreator = (
  dataTransportMethod: EDataTransportMethod
) => {
  switch (dataTransportMethod) {
    case EDataTransportMethod.BENCHMARK:
      // The benchmark just runs TheOperation "raw" in the same process
      return (data: IMockData[]) => Promise.resolve(TheOperation(data));

    case EDataTransportMethod.HTTP:
      return httpTransportMethod;

    case EDataTransportMethod.HTTP_EXPRESS_AXIOS:
      return httpExpressAxiosTransportMethod;

    default:
      throw Error(
        `Unsupported dataTransportMethod ${dataTransportMethod} provided`
      );
  }
};
