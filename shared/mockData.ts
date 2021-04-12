/**
 * Mock data from https://jsonplaceholder.typicode.com/comments as of 11.4.2021
 */
const MOCK_DATA_SIZE = (process.env.MOCK_DATA_SIZE || "medium") as
  | "small"
  | "medium";

export interface IMockData {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export const mockDataCreator = (): IMockData[] => {
  try {
    console.log(`Using ${MOCK_DATA_SIZE} size mock data.`);
    return require(`./mockData.${MOCK_DATA_SIZE}.json`);
  } catch {
    throw Error(`Invalid MOCK_DATA_SIZE ${MOCK_DATA_SIZE} specified :(`);
  }
};
