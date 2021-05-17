import axios from "axios";
import { IMockData } from "../shared/mockData";
import { ITheOperationResults } from "../shared/TheOperation";

const {
  THE_OPERATION_ENDPOINT_HOSTNAME,
  THE_OPERATION_ENDPOINT_PORT,
} = process.env;

export const httpExpressAxiosTransportMethod = async (
  data: IMockData[]
): Promise<ITheOperationResults> => {
  const response = await axios.post<ITheOperationResults>(
    `http://${THE_OPERATION_ENDPOINT_HOSTNAME}:${THE_OPERATION_ENDPOINT_PORT}`,
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json" } }
  );

  return response.data;
};
