/**
 * A shared function that can be used to write the results in a file.
 */
import * as fs from "fs";
import * as path from "path";
import { EMockDataSize } from "./mockData";
import { EDataTransportMethod } from "./TheOperationInterface";

export type TStatistics = {
  duration: number;
  TheOperationDuration: number;
  overheadDuration: number;
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

export type TStatisticsForDataTransportMethod = {
  dataTransportMethod: EDataTransportMethod;
  statisticsByMockDataSize: TStatisticsForMockDataSize[];
};

// export type TResultsSchema = TStatisticsForDataTransportMethod[];

export const documentResults = (
  date: Date,
  dataTransportMethod: EDataTransportMethod,
  mockDataSize: EMockDataSize,
  statistics: TStatistics
) => {
  const fileName = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}.raw.json`;

  let results: TStatisticsForDataTransportMethod[];

  try {
    results = require(`../results/${fileName}`);
  } catch (err) {
    // If there are no previous results, create the result scaffold to make
    // appending individual results more convenient.
    results = Object.values(EDataTransportMethod).map(
      (dataTransportMethod) => ({
        dataTransportMethod,
        statisticsByMockDataSize: Object.values(EMockDataSize).map(
          (mockDataSize) => ({
            mockDataSize,
            runs: [] as TStatisticsWithTimestamp[],
            averages: {} as TStatistics,
          })
        ),
      })
    );
  }

  const statisticsWithTimestamp: TStatisticsWithTimestamp = {
    ...statistics,
    timestamp: date,
  };

  const appendedResults = results.map((r) =>
    r.dataTransportMethod === dataTransportMethod
      ? {
          ...r,
          statisticsByMockDataSize: r.statisticsByMockDataSize.map((s) =>
            s.mockDataSize === mockDataSize
              ? {
                  ...s,
                  runs: [...s.runs, statisticsWithTimestamp],
                  averages: calculateAverages([
                    ...s.runs,
                    statisticsWithTimestamp,
                  ]),
                }
              : s
          ),
        }
      : r
  );

  fs.writeFileSync(
    path.join(__dirname, "..", "results", fileName),
    JSON.stringify(appendedResults)
  );
};

const calculateAverages = (
  statisticsArr: TStatisticsWithTimestamp[]
): TStatistics => {
  const averages: TStatistics = {
    duration: 0,
    TheOperationDuration: 0,
    overheadDuration: 0,
    overheadPercentage: 0,
  };
  const length = statisticsArr.length;

  // aggregate sums...
  statisticsArr.forEach((stats) => {
    averages.duration += stats.duration;
    averages.TheOperationDuration += stats.TheOperationDuration;
    averages.overheadDuration += stats.overheadDuration;
    averages.overheadPercentage += stats.overheadPercentage;
  });

  // ...and divide to averages
  averages.duration /= length;
  averages.TheOperationDuration /= length;
  averages.overheadDuration /= length;
  averages.overheadPercentage /= length;

  return averages;
};
