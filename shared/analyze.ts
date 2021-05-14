/**
 * Run analysis on the results
 */
import { TResultsSchema, TStatistics } from "./documentResults";
import { EMockDataSize } from "./mockData";
import { EDataTransportMethod } from "./TheOperationInterface";

const { INPUT_FILE } = process.env;

const results = require(INPUT_FILE as string) as TResultsSchema;

type TComparisonToBenchmark = {
  durationToBenchmarkValue: number;
  durationToBenchmarkPct: number;
  TheOperationDurationToBenchmarkValue: number;
  TheOperationDurationToBenchmarkPct: number;
  overheadDurationToBenchmarkValue: number;
  overheadDurationToBenchmarkPct: number;
};

type TAnalysis = {
  averageValues: TStatistics;
  comparisonToBenchmark: TComparisonToBenchmark;
};

type TPureTransportMethod = Exclude<EDataTransportMethod, "benchmark">;

type TResultComparisons = {
  [key in TPureTransportMethod]: {
    [key in EMockDataSize]: TAnalysis;
  };
};

type TBenchmarkAverages = {
  [key in EMockDataSize]: TStatistics;
};

type TResultAnalysis = {
  timestamp: Date;
  benchmarkAverages: {
    [key in EMockDataSize]: TStatistics;
  };
  comparisons: TResultComparisons;
};

type TResultAnalysisWithMetadata = TResultAnalysis;

/**
 * Helper for a typed Object.entries() use, see
 * https://github.com/microsoft/TypeScript/issues/35101
 */
type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

const entries = <T>(obj: T): Entries<T> => Object.entries(obj) as any;

export const analyze = (
  resultsData: TResultsSchema
): TResultAnalysisWithMetadata => {
  // Grab timestamp from any individual run
  const timestamp = resultsData.benchmark.small.runs[0].timestamp;

  const { benchmark, ...resultsWithoutAverages } = resultsData;

  const benchmarkAverages = entries(benchmark).reduce(
    (averagesByMockDataSize, [mockDataSize, { averages }]) => ({
      ...averagesByMockDataSize,
      [mockDataSize]: averages,
    }),
    {} as TBenchmarkAverages
  );

  const comparisons = entries(resultsWithoutAverages).reduce(
    (resultsComparison, [dataTransportMethod, comparisonData]) => ({
      ...resultsComparison,
      [dataTransportMethod]: entries(comparisonData).reduce(
        (analysisByMockDataSize, [mockDataSize, { averages }]) => ({
          ...analysisByMockDataSize,
          [mockDataSize]: {
            averageValues: averages,
            comparisonToBenchmark: compareToBenchmark(
              averages,
              benchmarkAverages[mockDataSize]
            ),
          },
        }),
        {} as { [key in EMockDataSize]: TAnalysis }
      ),
    }),
    {} as TResultComparisons
  );

  return {
    timestamp,
    benchmarkAverages,
    comparisons,
  };
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

const analyzedResults = analyze(results); // FIXME: testing
console.log(analyzedResults); // FIXME: testing
console.log(analyzedResults.comparisons.http);
