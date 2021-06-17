/**
 * A shared function that can be used to write the results in a file.
 */
import * as fs from 'fs';
import * as path from 'path';
import {
  EIPCMethod,
  EMockDataSize,
  TStatistics,
  TStatisticsForIPCMethod,
  TStatisticsWithTimestamp,
} from 'ipc-benchmark-testing-types';

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
    results = Object.values(EIPCMethod).map(ipcMethod => ({
      ipcMethod,
      statisticsByMockDataSize: Object.values(EMockDataSize).map(
        mockDataSize => ({
          mockDataSize,
          runs: [] as TStatisticsWithTimestamp[],
          averages: {} as TStatistics,
        }),
      ),
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
    JSON.stringify(appendedResults, null, 2),
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
