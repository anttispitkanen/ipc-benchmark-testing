/**
 * All the IPC methods need to be defined here. Add new
 * ones here if new ones are implemented.
 */
export enum EIPCMethod {
  BENCHMARK = 'benchmark',
  TCP = 'tcp',
  HTTP = 'http',
  HTTP_EXPRESS_AXIOS = 'http-express-axios',
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

export type TTheOperationWrapper = (
  data: TMockData[],
) => Promise<TTheOperationResults>;

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
  runs: TStatisticsWithTimestamp[];
  averages: TStatistics;
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

export type TStatisticsForMockDataSizeWithComparisons =
  TStatisticsForMockDataSize & {
    comparisonToBenchmark: TComparisonToBenchmark;
  };

export type TStatisticsForIPCMethodWithComparisons = {
  ipcMethod: EIPCMethod;
  statisticsByMockDataSize: TStatisticsForMockDataSizeWithComparisons[];
};
