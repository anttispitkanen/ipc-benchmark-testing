/**
 * Mock data from https://jsonplaceholder.typicode.com/comments as of 11.4.2021
 */
import { EMockDataSize, TMockData } from 'ipc-benchmark-testing-types';

export const loadMockData = (mockDataSize: EMockDataSize): TMockData[] => {
  try {
    console.log(`Using ${mockDataSize} size mock data.`);
    return require(`./mockData.${mockDataSize}.json`);
  } catch {
    throw Error(`Invalid mockDataSize ${mockDataSize} specified :(`);
  }
};
