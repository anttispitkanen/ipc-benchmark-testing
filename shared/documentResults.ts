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
} from 'ipc-benchmark-testing-types';

export const documentResults = (
  date: Date,
  ipcMethod: EIPCMethod,
  mockDataSize: EMockDataSize,
  runsArr: TStatistics[],
): TStatisticsForIPCMethod[] => {
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
          timestamp: date,
          runs: [] as TStatistics[],
        }),
      ),
    }));
  }

  const appendedResults = results.map(r =>
    r.ipcMethod === ipcMethod
      ? {
          ...r,
          statisticsByMockDataSize: r.statisticsByMockDataSize.map(s =>
            s.mockDataSize === mockDataSize
              ? {
                  ...s,
                  runs: [...s.runs, ...runsArr],
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

  return appendedResults;
};
