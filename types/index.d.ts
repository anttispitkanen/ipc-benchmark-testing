/**
 * All the IPC methods need to be defined here. Add new
 * ones here if new ones are implemented.
 */
export declare enum EIPCMethod {
    BENCHMARK = "benchmark",
    HTTP = "http",
    HTTP_EXPRESS_AXIOS = "http-express-axios"
}
/**
 * All the mock data sizes need to be listed here (in a sensible)
 * order. Add new ones here if new ones are implemented.
 */
export declare enum EMockDataSize {
    SMALL = "small",
    MEDIUM = "medium",
    LARGE = "large"
}
export declare type TMockData = {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
};
declare type TBodyWordStats = {
    word: string;
    numberOfAppearances: number;
    sourceCommentIds: number[];
};
export declare type TTheOperationResults = {
    durationMs: number;
    commentWithShortestName: TMockData;
    commentWithLongestName: TMockData;
    topFiveWordsInBody: TBodyWordStats[];
};
export declare type TTheOperationWrapper = (data: TMockData[]) => Promise<TTheOperationResults>;
export declare type TStatistics = {
    durationMs: number;
    TheOperationDurationMs: number;
    overheadDurationMs: number;
    overheadPercentage: number;
};
export declare type TStatisticsWithTimestamp = TStatistics & {
    timestamp: Date;
};
export declare type TStatisticsForMockDataSize = {
    mockDataSize: EMockDataSize;
    runs: TStatisticsWithTimestamp[];
    averages: TStatistics;
};
export declare type TStatisticsForIPCMethod = {
    ipcMethod: EIPCMethod;
    statisticsByMockDataSize: TStatisticsForMockDataSize[];
};
export declare type TComparisonToBenchmark = {
    durationToBenchmarkMs: number;
    durationToBenchmarkPct: number;
    TheOperationDurationToBenchmarkMs: number;
    TheOperationDurationToBenchmarkPct: number;
    overheadDurationToBenchmarkMs: number;
    overheadDurationToBenchmarkPct: number;
};
export declare type TStatisticsForMockDataSizeWithComparisons = TStatisticsForMockDataSize & {
    comparisonToBenchmark: TComparisonToBenchmark;
};
export declare type TStatisticsForIPCMethodWithComparisons = {
    ipcMethod: EIPCMethod;
    statisticsByMockDataSize: TStatisticsForMockDataSizeWithComparisons[];
};
export {};
