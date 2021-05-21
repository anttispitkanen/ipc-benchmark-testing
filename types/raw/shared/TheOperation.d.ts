import { IMockData } from './mockData';
declare type bodyWordStats = {
    word: string;
    numberOfAppearances: number;
    sourceCommentIds: number[];
};
export interface ITheOperationResults {
    durationMs: number;
    commentWithShortestName: IMockData;
    commentWithLongestName: IMockData;
    topFiveWordsInBody: bodyWordStats[];
}
export declare type TTheOperationWrapper = (data: IMockData[]) => Promise<ITheOperationResults>;
export declare const TheOperation: (commentsArray: IMockData[]) => ITheOperationResults;
export {};
