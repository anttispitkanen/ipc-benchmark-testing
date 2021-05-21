import { TStatisticsForDataTransportMethod, TStatisticsForMockDataSize } from './documentResults';
import { EDataTransportMethod } from './mainProcess';
declare type TComparisonToBenchmark = {
    durationToBenchmarkMs: number;
    durationToBenchmarkPct: number;
    TheOperationDurationToBenchmarkMs: number;
    TheOperationDurationToBenchmarkPct: number;
    overheadDurationToBenchmarkMs: number;
    overheadDurationToBenchmarkPct: number;
};
declare type TStatisticsForMockDataSizeWithComparisons = TStatisticsForMockDataSize & {
    comparisonToBenchmark: TComparisonToBenchmark;
};
export declare type TStatisticsForDataTransportMethodWithComparisons = {
    dataTransportMethod: EDataTransportMethod;
    statisticsByMockDataSize: TStatisticsForMockDataSizeWithComparisons[];
};
export declare const analyze: (resultsData: TStatisticsForDataTransportMethod[]) => TStatisticsForDataTransportMethodWithComparisons[];
export {};
