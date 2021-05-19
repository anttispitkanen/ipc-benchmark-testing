import axios from 'axios';
import type {
  TMockData,
  TTheOperationResults,
} from 'ipc-benchmark-testing-types';

const { THE_OPERATION_ENDPOINT_HOSTNAME, THE_OPERATION_ENDPOINT_PORT } =
  process.env;

export const httpExpressAxiosTransportMethod = async (
  data: TMockData[],
): Promise<TTheOperationResults> => {
  const response = await axios.post<TTheOperationResults>(
    `http://${THE_OPERATION_ENDPOINT_HOSTNAME}:${THE_OPERATION_ENDPOINT_PORT}`,
    JSON.stringify(data),
    { headers: { 'Content-Type': 'application/json' } },
  );

  return response.data;
};
