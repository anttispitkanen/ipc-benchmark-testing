/**
 * Run analysis on the results
 */
import * as fs from 'fs';
import * as path from 'path';
import {
  EIPCMethod,
  TStatisticsForIPCMethod,
  TStatistics,
  TAnalyzedStatisticsForIPCMethod,
  TAnalyzedStatisticsForIPCMethodWithComparisons,
  TComparisonToBenchmark,
} from 'ipc-benchmark-testing-types';

/**
 * Take the raw results, add averages and comparisons to benchmark,
 * and write to another file.
 */
export const analyze = (
  date: Date,
  results: TStatisticsForIPCMethod[],
): TAnalyzedStatisticsForIPCMethodWithComparisons[] => {
  const analyzedResults = addAnalysis(results);
  const comparedResults = addComparisons(analyzedResults);

  const fileName = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}.analyzed.json`;

  fs.writeFileSync(
    path.join(__dirname, '..', 'results', fileName),
    JSON.stringify(comparedResults, null, 2),
  );

  return comparedResults;
};

/**
 * Enrich results with averages
 */
const addAnalysis = (
  resultsData: TStatisticsForIPCMethod[],
): TAnalyzedStatisticsForIPCMethod[] =>
  resultsData.map(r => ({
    ...r,
    statisticsByMockDataSize: r.statisticsByMockDataSize.map(s => ({
      ...s,
      averages: calculateAverages(s.runs),
    })),
  }));

/**
 * Enrich results with comparisons to benchmark
 */
const addComparisons = (
  resultsData: TAnalyzedStatisticsForIPCMethod[],
): TAnalyzedStatisticsForIPCMethodWithComparisons[] =>
  resultsData.map(r => ({
    ...r,
    statisticsByMockDataSize: r.statisticsByMockDataSize.map(s => {
      const correspondingBenchmarkAverages = resultsData
        .find(r => r.ipcMethod === EIPCMethod.BENCHMARK)
        ?.statisticsByMockDataSize.find(
          stats => stats.mockDataSize === s.mockDataSize,
        )?.averages as TStatistics;

      return {
        ...s,
        comparisonToBenchmark: compareIndividualStatisticsToBenchmark(
          s.averages,
          correspondingBenchmarkAverages,
        ),
      };
    }),
  }));

const calculateAverages = (statisticsArr: TStatistics[]): TStatistics => {
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

const compareIndividualStatisticsToBenchmark = (
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
