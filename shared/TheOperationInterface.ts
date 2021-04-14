/**
 * Define a unified interface for TheOperation creator so that different
 * methods can be ran as sort of a dependency injection.
 */
import { TheOperation } from "./TheOperation";

// TODO: define more input types if more methods are tested
export enum EDataTransportMethod {
  BENCHMARK = "benchmark",
  HTTP = "http",
}

export type TTheOperationCreator = (
  methodToTest: EDataTransportMethod
) => typeof TheOperation;

export const TheOperationCreator: TTheOperationCreator = (
  dataTransportMethod: EDataTransportMethod
) => {
  switch (dataTransportMethod) {
    case EDataTransportMethod.BENCHMARK:
      // The benchmark just runs TheOperation "raw" in the same process
      return TheOperation;
    default:
      throw Error(`Unsupported methodToTest ${dataTransportMethod} provided`);
  }
};
