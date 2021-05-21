/**
 * Mock data from https://jsonplaceholder.typicode.com/comments as of 11.4.2021
 */
export enum EMockDataSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}
export interface IMockData {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export const loadMockData = (mockDataSize: EMockDataSize): IMockData[] => {
  try {
    console.log(`Using ${mockDataSize} size mock data.`);
    return require(`./mockData.${mockDataSize}.json`);
  } catch {
    throw Error(`Invalid mockDataSize ${mockDataSize} specified :(`);
  }
};
