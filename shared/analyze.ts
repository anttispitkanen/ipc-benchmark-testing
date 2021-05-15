/**
 * Run analysis on the results
 */
import * as fs from "fs";
import * as path from "path";
import {
  TStatisticsForDataTransportMethod,
  TStatistics,
  TStatisticsForMockDataSize,
} from "./documentResults";
import { EDataTransportMethod } from "./TheOperationInterface";

const { INPUT_FILE } = process.env;

const results = require(INPUT_FILE as string) as TStatisticsForDataTransportMethod[];

type TComparisonToBenchmark = {
  durationToBenchmarkValue: number;
  durationToBenchmarkPct: number;
  TheOperationDurationToBenchmarkValue: number;
  TheOperationDurationToBenchmarkPct: number;
  overheadDurationToBenchmarkValue: number;
  overheadDurationToBenchmarkPct: number;
};

type TStatisticsForMockDataSizeWithComparisons = TStatisticsForMockDataSize & {
  comparisonToBenchmark: TComparisonToBenchmark;
};

type TStatisticsForDataTransportMethodWithComparisons = {
  dataTransportMethod: EDataTransportMethod;
  statisticsByMockDataSize: TStatisticsForMockDataSizeWithComparisons[];
};

export const analyze = (
  resultsData: TStatisticsForDataTransportMethod[]
): TStatisticsForDataTransportMethodWithComparisons[] => {
  return resultsData.map((r) => ({
    ...r,
    statisticsByMockDataSize: r.statisticsByMockDataSize.map((s) => {
      const correspondingBenchmarkAverages = resultsData
        .find((r) => r.dataTransportMethod === EDataTransportMethod.BENCHMARK)
        ?.statisticsByMockDataSize.find(
          (stats) => stats.mockDataSize === s.mockDataSize
        )?.averages;

      return {
        ...s,
        comparisonToBenchmark: compareToBenchmark(
          s.averages,
          correspondingBenchmarkAverages as TStatistics
        ),
      };
    }),
  }));
};

const compareToBenchmark = (
  comparisonAverages: TStatistics,
  benchmarkAverages: TStatistics
): TComparisonToBenchmark => {
  const durationToBenchmarkValue =
    comparisonAverages.duration - benchmarkAverages.duration;

  const durationToBenchmarkPct =
    (durationToBenchmarkValue / benchmarkAverages.duration) * 100;

  const TheOperationDurationToBenchmarkValue =
    comparisonAverages.TheOperationDuration -
    benchmarkAverages.TheOperationDuration;

  const TheOperationDurationToBenchmarkPct =
    (TheOperationDurationToBenchmarkValue /
      benchmarkAverages.TheOperationDuration) *
    100;

  const overheadDurationToBenchmarkValue =
    comparisonAverages.overheadDuration - benchmarkAverages.overheadDuration;

  const overheadDurationToBenchmarkPct =
    (overheadDurationToBenchmarkValue / benchmarkAverages.overheadDuration) *
    100;

  return {
    durationToBenchmarkValue,
    durationToBenchmarkPct,
    TheOperationDurationToBenchmarkValue,
    TheOperationDurationToBenchmarkPct,
    overheadDurationToBenchmarkValue,
    overheadDurationToBenchmarkPct,
  };
};

const analyzedResults = analyze(results);

const fileName =
  INPUT_FILE?.split("/").pop()?.replace("raw", "analyzed") || "missing.json";

fs.writeFileSync(
  path.join(__dirname, "..", "results", fileName),
  JSON.stringify(analyzedResults)
);
