/**
 * Mock data from https://jsonplaceholder.typicode.com/comments as of 11.4.2021
 */
const data = require("./mockData.json");

export interface IMockData {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export default data as IMockData[];
