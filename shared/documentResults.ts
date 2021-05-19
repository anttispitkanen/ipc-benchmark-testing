/**
 * A shared function that can be used to write the results in a file.
 */
import * as fs from 'fs';
import * as path from 'path';
import type {
  EIPCMethod,
  EMockDataSize,
  TStatistics,
  TStatisticsForIPCMethod,
  TStatisticsWithTimestamp,
} from 'ipc-benchmark-testing-types';

/**
 * Helper arrays for looping through
 */
const IPC_METHODS: EIPCMethod[] = [
  'benchmark' as EIPCMethod.BENCHMARK,
  'http' as EIPCMethod.HTTP,
  'http-express-axios' as EIPCMethod.HTTP_EXPRESS_AXIOS,
];

const MOCK_DATA_SIZES: EMockDataSize[] = [
  'small' as EMockDataSize.SMALL,
  'medium' as EMockDataSize.MEDIUM,
  'large' as EMockDataSize.LARGE,
];

export const documentResults = (
  date: Date,
  ipcMethod: EIPCMethod,
  mockDataSize: EMockDataSize,
  statistics: TStatistics,
) => {
  const fileName = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}.raw.json`;

  let results: TStatisticsForIPCMethod[];

  try {
    results = require(`../results/${fileName}`);
  } catch (err) {
    // If there are no previous results, create the result scaffold to make
    // appending individual results more convenient.
    results = IPC_METHODS.map(ipcMethod => ({
      ipcMethod,
      statisticsByMockDataSize: MOCK_DATA_SIZES.map(mockDataSize => ({
        mockDataSize,
        runs: [] as TStatisticsWithTimestamp[],
        averages: {} as TStatistics,
      })),
    }));
  }

  const statisticsWithTimestamp: TStatisticsWithTimestamp = {
    ...statistics,
    timestamp: date,
  };

  const appendedResults = results.map(r =>
    r.ipcMethod === ipcMethod
      ? {
          ...r,
          statisticsByMockDataSize: r.statisticsByMockDataSize.map(s =>
            s.mockDataSize === mockDataSize
              ? {
                  ...s,
                  runs: [...s.runs, statisticsWithTimestamp],
                  averages: calculateAverages([
                    ...s.runs,
                    statisticsWithTimestamp,
                  ]),
                }
              : s,
          ),
        }
      : r,
  );

  fs.writeFileSync(
    path.join(__dirname, '..', 'results', fileName),
    JSON.stringify(appendedResults),
  );
};

const calculateAverages = (
  statisticsArr: TStatisticsWithTimestamp[],
): TStatistics => {
  const averages: TStatistics = {
    durationMs: 0,
    TheOperationDurationMs: 0,
    overheadDurationMs: 0,
    overheadPercentage: 0,
  };
  const length = statisticsArr.length;

  // aggregate sums...
  statisticsArr.forEach(stats => {
    averages.durationMs += stats.durationMs;
    averages.TheOperationDurationMs += stats.TheOperationDurationMs;
    averages.overheadDurationMs += stats.overheadDurationMs;
    averages.overheadPercentage += stats.overheadPercentage;
  });

  // ...and divide to averages
  averages.durationMs /= length;
  averages.TheOperationDurationMs /= length;
  averages.overheadDurationMs /= length;
  averages.overheadPercentage /= length;

  return averages;
};
