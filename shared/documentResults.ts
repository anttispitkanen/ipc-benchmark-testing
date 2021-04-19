/**
 * A shared function that can be used to write the results in a file.
 */
import * as fs from "fs";
import * as path from "path";
import { EMockDataSize } from "./mockData";
import { EDataTransportMethod } from "./TheOperationInterface";

export type TStatistics = {
  duration: number;
  TheProcessDuration: number;
  overheadDuration: number;
  overheadPercentage: number;
};

export type TStatisticsWithTimestamp = TStatistics & {
  timestamp: Date;
};

export type TResultsSchema = {
  [key in EDataTransportMethod]: {
    [key in EMockDataSize]: {
      runs: TStatisticsWithTimestamp[];
      averages: TStatistics[];
    };
  };
};

export const documentResults = (
  date: Date,
  dataTransportMethod: EDataTransportMethod,
  mockDataSize: EMockDataSize,
  statistics: TStatistics
) => {
  const fileName = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}.json`;

  let previousResults: TResultsSchema;

  try {
    previousResults = require(`../results/${fileName}`);
  } catch (err) {
    previousResults = {} as TResultsSchema;
  }

  // TODO: refactor, this is terrible to read
  const appendedResults: TResultsSchema = {
    ...previousResults,
    [dataTransportMethod]: {
      ...previousResults[dataTransportMethod],
      [mockDataSize]: {
        runs: [
          ...(previousResults?.[dataTransportMethod]?.[mockDataSize]?.runs ||
            []),
          { ...statistics, timestamp: date },
        ],
        averages: calculateAverages([
          ...(previousResults?.[dataTransportMethod]?.[mockDataSize]?.runs ||
            []),
          { ...statistics, timestamp: date },
        ]),
      },
    },
  };

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
    TheProcessDuration: 0,
    overheadDuration: 0,
    overheadPercentage: 0,
  };
  const length = statisticsArr.length;

  // aggregate sums...
  statisticsArr.forEach((stats) => {
    averages.duration += stats.duration;
    averages.TheProcessDuration += stats.TheProcessDuration;
    averages.overheadDuration += stats.overheadDuration;
    averages.overheadPercentage += stats.overheadPercentage;
  });

  // ...and divide to averages
  averages.duration /= length;
  averages.TheProcessDuration /= length;
  averages.overheadDuration /= length;
  averages.overheadPercentage /= length;

  return averages;
};
