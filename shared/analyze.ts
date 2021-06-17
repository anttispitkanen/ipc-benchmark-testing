/**
 * Run analysis on the results
 */
import * as fs from 'fs';
import * as path from 'path';
import {
  EIPCMethod,
  TStatisticsForIPCMethod,
  TStatistics,
  TStatisticsForIPCMethodWithComparisons,
  TComparisonToBenchmark,
} from 'ipc-benchmark-testing-types';

const { INPUT_FILE } = process.env;

const results = require(INPUT_FILE as string) as TStatisticsForIPCMethod[];

export const analyze = (
  resultsData: TStatisticsForIPCMethod[],
): TStatisticsForIPCMethodWithComparisons[] => {
  return resultsData.map(r => ({
    ...r,
    statisticsByMockDataSize: r.statisticsByMockDataSize.map(s => {
      const correspondingBenchmarkAverages = resultsData
        .find(r => r.ipcMethod === EIPCMethod.BENCHMARK)
        ?.statisticsByMockDataSize.find(
          stats => stats.mockDataSize === s.mockDataSize,
        )?.averages;

      return {
        ...s,
        comparisonToBenchmark: compareToBenchmark(
          s.averages,
          correspondingBenchmarkAverages as TStatistics,
        ),
      };
    }),
  }));
};

const compareToBenchmark = (
  comparisonAverages: TStatistics,
  benchmarkAverages: TStatistics,
): TComparisonToBenchmark => {
  const durationToBenchmarkMs =
    comparisonAverages.durationMs - benchmarkAverages.durationMs;

  const durationToBenchmarkPct =
    (durationToBenchmarkMs / benchmarkAverages.durationMs) * 100;

  const TheOperationDurationToBenchmarkMs =
    comparisonAverages.TheOperationDurationMs -
    benchmarkAverages.TheOperationDurationMs;

  const TheOperationDurationToBenchmarkPct =
    (TheOperationDurationToBenchmarkMs /
      benchmarkAverages.TheOperationDurationMs) *
    100;

  const overheadDurationToBenchmarkMs =
    comparisonAverages.overheadDurationMs -
    benchmarkAverages.overheadDurationMs;

  const overheadDurationToBenchmarkPct =
    (overheadDurationToBenchmarkMs / benchmarkAverages.overheadDurationMs) *
    100;

  return {
    durationToBenchmarkMs,
    durationToBenchmarkPct,
    TheOperationDurationToBenchmarkMs,
    TheOperationDurationToBenchmarkPct,
    overheadDurationToBenchmarkMs,
    overheadDurationToBenchmarkPct,
  };
};

const analyzedResults = analyze(results);

const fileName =
  INPUT_FILE?.split('/').pop()?.replace('raw', 'analyzed') || 'missing.json';

fs.writeFileSync(
  path.join(__dirname, '..', 'results', fileName),
  JSON.stringify(analyzedResults, null, 2),
);
