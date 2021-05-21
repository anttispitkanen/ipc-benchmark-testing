import { EMockDataSize } from './mockData';
import { EDataTransportMethod } from './mainProcess';
export declare type TStatistics = {
    durationMs: number;
    TheOperationDurationMs: number;
    overheadDurationMs: number;
    overheadPercentage: number;
};
export declare type TStatisticsWithTimestamp = TStatistics & {
    timestamp: Date;
};
export declare type TStatisticsForMockDataSize = {
    mockDataSize: EMockDataSize;
    runs: TStatisticsWithTimestamp[];
    averages: TStatistics;
};
export declare type TStatisticsForDataTransportMethod = {
    dataTransportMethod: EDataTransportMethod;
    statisticsByMockDataSize: TStatisticsForMockDataSize[];
};
export declare const documentResults: (date: Date, dataTransportMethod: EDataTransportMethod, mockDataSize: EMockDataSize, statistics: TStatistics) => void;
