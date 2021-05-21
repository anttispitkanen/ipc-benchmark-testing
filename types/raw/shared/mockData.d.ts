/**
 * Mock data from https://jsonplaceholder.typicode.com/comments as of 11.4.2021
 */
export declare enum EMockDataSize {
    SMALL = "small",
    MEDIUM = "medium",
    LARGE = "large"
}
export interface IMockData {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}
export declare const loadMockData: (mockDataSize: EMockDataSize) => IMockData[];
