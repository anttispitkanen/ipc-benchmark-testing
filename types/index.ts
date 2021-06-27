/**
 * All the IPC methods need to be defined here. Add new
 * ones here if new ones are implemented.
 */
export enum EIPCMethod {
  BENCHMARK = 'benchmark',
  UNIX_SOCKET = 'unix-socket',
  TCP = 'tcp',
  HTTP = 'http',
  HTTP_EXPRESS_AXIOS = 'http-express-axios',
  HTTPS = 'https',
}

/**
 * All the mock data sizes need to be listed here (in a sensible)
 * order. Add new ones here if new ones are implemented.
 */
export enum EMockDataSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export type TMockData = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

type TBodyWordStats = {
  word: string;
  numberOfAppearances: number;
  // Which comments the word appeared in
  sourceCommentIds: number[];
};

export type TTheOperationResults = {
  durationMs: number;
  commentWithShortestName: TMockData;
  commentWithLongestName: TMockData;
  topFiveWordsInBody: TBodyWordStats[];
};

export type TTheOperationWrapper = {
  runTheOperation: (data: TMockData[]) => Promise<TTheOperationResults>;
  close: () => Promise<void>;
};

export type TStatistics = {
  durationMs: number;
  TheOperationDurationMs: number;
  overheadDurationMs: number;
  overheadPercentage: number;
};
export type TStatisticsWithTimestamp = TStatistics & {
  timestamp: Date;
};
export type TStatisticsForMockDataSize = {
  mockDataSize: EMockDataSize;
  timestamp: Date;
  runs: TStatistics[];
};

export type TStatisticsForIPCMethod = {
  ipcMethod: EIPCMethod;
  statisticsByMockDataSize: TStatisticsForMockDataSize[];
};

export type TComparisonToBenchmark = {
  durationToBenchmarkMs: number;
  durationToBenchmarkPct: number;
  TheOperationDurationToBenchmarkMs: number;
  TheOperationDurationToBenchmarkPct: number;
  overheadDurationToBenchmarkMs: number;
  overheadDurationToBenchmarkPct: number;
};

export type TAnalyzedStatisticsForMockDataSize = TStatisticsForMockDataSize & {
  averages: TStatistics;
};

export type TAnalyzedStatisticsForMockDataSizeWithComparisons =
  TAnalyzedStatisticsForMockDataSize & {
    comparisonToBenchmark: TComparisonToBenchmark;
  };

export type TAnalyzedStatisticsForIPCMethod = {
  ipcMethod: EIPCMethod;
  statisticsByMockDataSize: TAnalyzedStatisticsForMockDataSize[];
};

export type TAnalyzedStatisticsForIPCMethodWithComparisons = {
  ipcMethod: EIPCMethod;
  statisticsByMockDataSize: TAnalyzedStatisticsForMockDataSizeWithComparisons[];
};
