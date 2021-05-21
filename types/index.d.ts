/**
 * Mock data from https://jsonplaceholder.typicode.com/comments as of 11.4.2021
 */
declare enum EMockDataSize {
    SMALL = "small",
    MEDIUM = "medium",
    LARGE = "large"
}
interface IMockData {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}
declare const loadMockData: (mockDataSize: EMockDataSize) => IMockData[];

type mockData_d_EMockDataSize = EMockDataSize;
declare const mockData_d_EMockDataSize: typeof EMockDataSize;
type mockData_d_IMockData = IMockData;
declare const mockData_d_loadMockData: typeof loadMockData;
declare namespace mockData_d {
  export {
    mockData_d_EMockDataSize as EMockDataSize,
    mockData_d_IMockData as IMockData,
    mockData_d_loadMockData as loadMockData,
  };
}

declare type bodyWordStats = {
    word: string;
    numberOfAppearances: number;
    sourceCommentIds: number[];
};
interface ITheOperationResults {
    durationMs: number;
    commentWithShortestName: IMockData;
    commentWithLongestName: IMockData;
    topFiveWordsInBody: bodyWordStats[];
}
declare type TTheOperationWrapper = (data: IMockData[]) => Promise<ITheOperationResults>;
declare const TheOperation: (commentsArray: IMockData[]) => ITheOperationResults;

type TheOperation_d_ITheOperationResults = ITheOperationResults;
type TheOperation_d_TTheOperationWrapper = TTheOperationWrapper;
declare const TheOperation_d_TheOperation: typeof TheOperation;
declare namespace TheOperation_d {
  export {
    TheOperation_d_ITheOperationResults as ITheOperationResults,
    TheOperation_d_TTheOperationWrapper as TTheOperationWrapper,
    TheOperation_d_TheOperation as TheOperation,
  };
}

declare enum EDataTransportMethod {
    BENCHMARK = "benchmark",
    HTTP = "http",
    HTTP_EXPRESS_AXIOS = "http-express-axios"
}
/**
 * Each IPC can import this function and give the desired data transport method
 * as a dependency injection.
 */
declare const mainProcess: (TheOperationWrapper: TTheOperationWrapper, dataTransportMethod: EDataTransportMethod) => void;

type mainProcess_d_EDataTransportMethod = EDataTransportMethod;
declare const mainProcess_d_EDataTransportMethod: typeof EDataTransportMethod;
declare const mainProcess_d_mainProcess: typeof mainProcess;
declare namespace mainProcess_d {
  export {
    mainProcess_d_EDataTransportMethod as EDataTransportMethod,
    mainProcess_d_mainProcess as mainProcess,
  };
}

declare type TStatistics = {
    durationMs: number;
    TheOperationDurationMs: number;
    overheadDurationMs: number;
    overheadPercentage: number;
};
declare type TStatisticsWithTimestamp = TStatistics & {
    timestamp: Date;
};
declare type TStatisticsForMockDataSize = {
    mockDataSize: EMockDataSize;
    runs: TStatisticsWithTimestamp[];
    averages: TStatistics;
};
declare type TStatisticsForDataTransportMethod = {
    dataTransportMethod: EDataTransportMethod;
    statisticsByMockDataSize: TStatisticsForMockDataSize[];
};
declare const documentResults: (date: Date, dataTransportMethod: EDataTransportMethod, mockDataSize: EMockDataSize, statistics: TStatistics) => void;

type documentResults_d_TStatistics = TStatistics;
type documentResults_d_TStatisticsWithTimestamp = TStatisticsWithTimestamp;
type documentResults_d_TStatisticsForMockDataSize = TStatisticsForMockDataSize;
type documentResults_d_TStatisticsForDataTransportMethod = TStatisticsForDataTransportMethod;
declare const documentResults_d_documentResults: typeof documentResults;
declare namespace documentResults_d {
  export {
    documentResults_d_TStatistics as TStatistics,
    documentResults_d_TStatisticsWithTimestamp as TStatisticsWithTimestamp,
    documentResults_d_TStatisticsForMockDataSize as TStatisticsForMockDataSize,
    documentResults_d_TStatisticsForDataTransportMethod as TStatisticsForDataTransportMethod,
    documentResults_d_documentResults as documentResults,
  };
}

declare type TComparisonToBenchmark = {
    durationToBenchmarkMs: number;
    durationToBenchmarkPct: number;
    TheOperationDurationToBenchmarkMs: number;
    TheOperationDurationToBenchmarkPct: number;
    overheadDurationToBenchmarkMs: number;
    overheadDurationToBenchmarkPct: number;
};
declare type TStatisticsForMockDataSizeWithComparisons = TStatisticsForMockDataSize & {
    comparisonToBenchmark: TComparisonToBenchmark;
};
declare type TStatisticsForDataTransportMethodWithComparisons = {
    dataTransportMethod: EDataTransportMethod;
    statisticsByMockDataSize: TStatisticsForMockDataSizeWithComparisons[];
};
declare const analyze: (resultsData: TStatisticsForDataTransportMethod[]) => TStatisticsForDataTransportMethodWithComparisons[];

type analyze_d_TStatisticsForDataTransportMethodWithComparisons = TStatisticsForDataTransportMethodWithComparisons;
declare const analyze_d_analyze: typeof analyze;
declare namespace analyze_d {
  export {
    analyze_d_TStatisticsForDataTransportMethodWithComparisons as TStatisticsForDataTransportMethodWithComparisons,
    analyze_d_analyze as analyze,
  };
}

/**
 * Use performance.now() to create timestamps that can be used
 * for logging operation times. Returns the value in milliseconds.
 *
 * Note that we are by no means actually interested in nanosecond
 * level accuracy, but simply a ballpark.
 */
declare const timestamp: () => number;

declare const timestamp_d_timestamp: typeof timestamp;
declare namespace timestamp_d {
  export {
    timestamp_d_timestamp as timestamp,
  };
}

export { analyze_d as Analyze, documentResults_d as DocumentResults, mainProcess_d as MainProcess, mockData_d as MockData, TheOperation_d as TheOperation, timestamp_d as Timestamp };
