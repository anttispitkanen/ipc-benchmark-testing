import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  TStatisticsForIPCMethodWithComparisons,
  EMockDataSize,
  EIPCMethod,
} from 'ipc-benchmark-testing-types';

const colors = [
  {
    background: 'rgba(255, 99, 132, 0.2)',
    border: 'rgba(255, 99, 132, 1)',
  },
  {
    background: 'rgba(54, 162, 235, 0.2)',
    border: 'rgba(54, 162, 235, 1)',
  },
  {
    background: 'rgba(255, 206, 86, 0.2)',
    border: 'rgba(255, 206, 86, 1)',
  },
  {
    background: 'rgba(75, 192, 192, 0.2)',
    border: 'rgba(75, 192, 192, 1)',
  },
  {
    background: 'rgba(153, 102, 255, 0.2)',
    border: 'rgba(153, 102, 255, 1)',
  },
  {
    background: 'rgba(255, 159, 64, 0.2)',
    border: 'rgba(255, 159, 64, 1)',
  },
];

const propDataToChartData = (
  propData: TStatisticsForIPCMethodWithComparisons[],
  mockDataSize: EMockDataSize,
): { TheOperationDurationMs: number[]; overheadDurationMs: number[] } => ({
  TheOperationDurationMs: propData.map(
    d =>
      d.statisticsByMockDataSize.find(s => s.mockDataSize === mockDataSize)
        ?.averages.TheOperationDurationMs || 0,
  ),
  overheadDurationMs: propData.map(
    d =>
      d.statisticsByMockDataSize.find(s => s.mockDataSize === mockDataSize)
        ?.averages.overheadDurationMs || 0,
  ),
});

const datasetsBase: {
  label: string;
  dataProperty: 'TheOperationDurationMs' | 'overheadDurationMs';
}[] = [
  {
    label: 'TheOperation duration (ms)',
    dataProperty: 'TheOperationDurationMs',
  },
  {
    label: 'Overhead duration (ms)',
    dataProperty: 'overheadDurationMs',
  },
];

const chartCompatibleData = (
  data: TStatisticsForIPCMethodWithComparisons[],
  mockDataSize: EMockDataSize,
) => {
  const chartData = propDataToChartData(data, mockDataSize);

  return {
    labels: Object.values(EIPCMethod),
    datasets: datasetsBase.map((d, i) => ({
      label: d.label,
      data: chartData[d.dataProperty],
      backgroundColor: colors[i].background,
      borderColor: colors[i].border,
      borderWidth: 1,
    })),
  };
};

const options = {
  scales: {
    y: {
      title: {
        display: true,
        text: 'Milliseconds',
      },
      stacked: true,
    },
    x: {
      stacked: true,
    },
  },
};

const VerticalBar = ({
  dataProp,
  mockDataSizeProp,
}: {
  dataProp: TStatisticsForIPCMethodWithComparisons[];
  mockDataSizeProp: EMockDataSize;
}) => {
  const chartData = chartCompatibleData(dataProp, mockDataSizeProp);

  return (
    <div id="durations-chart">
      <h2 className="title">Durations by IPC method</h2>
      <Bar
        type="bar"
        width={800}
        height={500}
        data={chartData}
        options={options}
      />
    </div>
  );
};

export default VerticalBar;
